import asyncio
from faster_whisper import WhisperModel
import numpy as np

class TranscriptionWorker:
    def __init__(self, model_size="tiny.en", device="cpu", compute_type="int8"):
        """
        Initializes the local faster-whisper model.
        Runs entirely locally on CPU by default.
        """
        self.model = WhisperModel(model_size, device=device, compute_type=compute_type)

    def _transcribe_sync(self, audio_data: np.ndarray, sample_rate: int = 16000) -> str:
        """
        Synchronous Whisper inference.
        faster-whisper handles normalization automatically, but we ensure it's flat float32.
        """
        segments, info = self.model.transcribe(audio_data, beam_size=5)
        text = " ".join([segment.text for segment in segments])
        return text.strip()

    async def transcribe(self, audio_data: np.ndarray, sample_rate: int = 16000) -> str:
        """
        Offloads the CPU-heavy whisper inference to an asyncio background executor pool
        to prevent blocking the main I/O threads.
        """
        loop = asyncio.get_running_loop()
        # run_in_executor uses the default ThreadPoolExecutor
        text = await loop.run_in_executor(None, self._transcribe_sync, audio_data, sample_rate)
        return text
