import asyncio
import numpy as np
import sounddevice as sd

class AudioIngestionEngine:
    def __init__(self, sample_rate=16000, channels=1, dtype='float32', blocksize=1024):
        self.sample_rate = sample_rate
        self.channels = channels
        self.dtype = dtype
        self.blocksize = blocksize
        self.queue = asyncio.Queue()
        self.loop = asyncio.get_event_loop()

    def _audio_callback(self, indata, frames, time, status):
        """
        Thread-safe hardware callback that pushes raw audio copies into an internal asyncio.Queue.
        """
        if status:
            print(f"Ingestion Status: {status}", flush=True)
            
        # Copy the numpy array to prevent data corruption as the buffer is reused by sounddevice
        data_copy = indata.copy()
        
        # Schedule the push to the asyncio queue in a thread-safe manner
        self.loop.call_soon_threadsafe(self.queue.put_nowait, data_copy)

    def get_stream(self):
        """
        Returns the sounddevice InputStream context manager.
        """
        return sd.InputStream(
            samplerate=self.sample_rate,
            channels=self.channels,
            dtype=self.dtype,
            blocksize=self.blocksize,
            callback=self._audio_callback
        )
