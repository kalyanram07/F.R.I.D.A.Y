import asyncio
import numpy as np
import sys
from app.audio.ingestion import AudioIngestionEngine
from app.audio.transcription import TranscriptionWorker
from app.audio.synthesis import SynthesisEngine
from app.agent.pipeline import AntigravityPipeline
from app.agent.memory import SlidingMemory

async def consume_audio_loop(engine: AudioIngestionEngine):
    """
    Concurrent main-thread async consumer loop that pulls chunks from the queue,
    calculates the RMS amplitude, and dispatches to Whisper when a threshold is met.
    """
    print("\n[System] Initializing Core Architectures...")
    transcriber = TranscriptionWorker()
    synth = SynthesisEngine()
    pipeline = AntigravityPipeline()
    memory = SlidingMemory()
    
    print("[System] Core Architectures Loaded. Speak into your microphone!")
    
    audio_buffer = []
    is_recording = False
    silence_counter = 0
    SILENCE_LIMIT = 30 # roughly 1-2 seconds of silence depending on blocksize/rate

    while True:
        data = await engine.queue.get()
        rms = np.sqrt(np.mean(data**2))
        
        # Simple Voice Activity Detection (VAD) via RMS thresholding
        threshold = 0.015 # Adjust this based on mic volume
        
        if rms > threshold:
            if not is_recording:
                sys.stdout.write("\n[+] Voice Detected. Recording...\n")
                is_recording = True
            silence_counter = 0
            audio_buffer.append(data)
        elif is_recording:
            silence_counter += 1
            audio_buffer.append(data)
            if silence_counter > SILENCE_LIMIT:
                sys.stdout.write("[-] Silence Detected. Processing Audio...\n")
                is_recording = False
                
                # Combine buffered chunks into a continuous numpy array
                full_audio = np.concatenate(audio_buffer).flatten()
                audio_buffer = []
                
                # 1. Transcribe (Background Thread)
                text = await transcriber.transcribe(full_audio, engine.sample_rate)
                if not text.strip():
                    continue
                print(f"[User]: {text}")
                
                # 2. Add to Memory and Dispatch to Colab (Async IO)
                memory.add_user_message(text)
                system_prompt = "You are F.R.I.D.A.Y, a highly capable AI assistant."
                response = await pipeline.process_prompt(system_prompt, memory.get_context())
                
                # 3. Parse Response
                if "error" in response:
                    reply = f"Network Error: {response['error']}"
                    print(f"[F.R.I.D.A.Y]: {reply}")
                    memory.add_assistant_message(reply)
                    await synth.speak(reply)
                else:
                    tool_calls = response.get("tool_calls", [])
                    reply = response.get("text", "")
                    
                    if tool_calls:
                        from app.automation.monitor_tools import WindowAutomation
                        for tool in tool_calls:
                            tool_name = tool.get("name")
                            print(f"[System] Intercepted Tool Call: {tool_name}")
                            result = ""
                            if tool_name == "move_window":
                                result = WindowAutomation.move_window(tool.get("arguments", {}))
                            elif tool_name == "launch_dashboard":
                                result = WindowAutomation.launch_dashboard(tool.get("arguments", {}))
                            elif tool_name == "get_system_telemetry":
                                result = WindowAutomation.get_system_telemetry(tool.get("arguments", {}))
                            
                            if result:
                                print(f"[System Tool Result]: {result}")
                                memory.add_assistant_message(f"Action Executed: {result}")
                                if not reply:
                                    reply = "Action complete."

                    if reply:
                        print(f"[F.R.I.D.A.Y]: {reply}")
                        memory.add_assistant_message(reply)
                        
                        # 4. Speak (Background Thread)
                        await synth.speak(reply)
                        
                print("\n[System] Listening...")

async def main():
    engine = AudioIngestionEngine()
    
    with engine.get_stream():
        print("[System] Hardware audio stream successfully opened.")
        await consume_audio_loop(engine)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n[System] Exiting F.R.I.D.A.Y. Shutdown complete.")
