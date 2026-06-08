from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI(title="F.R.I.D.A.Y Inference Endpoint")

class InferenceRequest(BaseModel):
    system_prompt: str
    messages: List[Dict[str, str]]

@app.post("/generate")
async def generate(req: InferenceRequest):
    """
    Receives forwarded history via Ngrok and routes it to local LLM logic.
    For this boilerplate, we simply echo back with a mocked LLM response.
    """
    last_user_message = next((m['content'] for m in reversed(req.messages) if m['role'] == 'user'), "")
    
    # In a real scenario, invoke vLLM or HuggingFace pipelines here
    response_text = f"I am operating from Google Colab. I heard you say: '{last_user_message}'"
    
    return {
        "text": response_text,
        "tool_calls": []
    }

if __name__ == "__main__":
    import uvicorn
    # Bound to 0.0.0.0 for external Ngrok tunneling
    uvicorn.run(app, host="0.0.0.0", port=8000)
