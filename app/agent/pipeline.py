import aiohttp
import os
import logging
from dotenv import load_dotenv

load_dotenv()

class AntigravityPipeline:
    def __init__(self):
        self.colab_endpoint = os.getenv("COLAB_NGROK_URL", "http://localhost:8000")
        self.generate_url = f"{self.colab_endpoint}/generate"

    async def process_prompt(self, system_prompt: str, context: list) -> dict:
        """
        Dispatches the context payload to the Google Colab Ngrok tunnel asynchronously.
        """
        payload = {
            "system_prompt": system_prompt,
            "messages": context
        }
        
        async with aiohttp.ClientSession() as session:
            try:
                async with session.post(self.generate_url, json=payload, timeout=30) as response:
                    if response.status == 200:
                        return await response.json()
                    else:
                        logging.error(f"Inference HTTP {response.status}: {await response.text()}")
                        return {"error": f"HTTP {response.status}"}
            except Exception as e:
                logging.error(f"Inference Network Error: {e}")
                return {"error": str(e)}
