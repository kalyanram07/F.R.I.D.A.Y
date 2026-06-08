import pyttsx3
import asyncio

class SynthesisEngine:
    def __init__(self, rate: int = 165):
        """
        Initializes the native Windows local TTS engine using pyttsx3.
        """
        self.engine = pyttsx3.init()
        self.engine.setProperty('rate', rate)

    def _speak_sync(self, text: str):
        """
        Synchronous speech generation.
        """
        self.engine.say(text)
        self.engine.runAndWait()

    async def speak(self, text: str):
        """
        Offloads the blocking C-level audio driver playback to a background thread.
        """
        loop = asyncio.get_running_loop()
        await loop.run_in_executor(None, self._speak_sync, text)
