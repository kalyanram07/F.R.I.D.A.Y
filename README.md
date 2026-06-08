# F.R.I.D.A.Y

F.R.I.D.A.Y is an advanced, voice-activated AI assistant tailored for Windows. It features a distributed architecture with a local execution arm for sensory I/O and OS-level control, coupled with a remote computation engine (Google Colab) for heavy LLM inference.

## 🏗️ Project Architecture

```text
C:\programming skills\LLM\F.R.I.D.A.Y\
│
├── .env                        # Windows environment paths & Ngrok tunnel tokens
├── requirements.txt            # Your bare-metal python dependencies
├── run.py                      # Master Entry Point (Launches our async loops)
│
├── app/                        # Main Application Package
│   ├── __init__.py
│   ├── config.py               # Monitor resolution profiles (e.g., X=1920, Y=0)
│   │
│   ├── agent/                  # Antigravity Orchestration Core
│   │   ├── __init__.py
│   │   ├── pipeline.py         # Handles calls to Google Colab & Antigravity hooks
│   │   └── memory.py           # Sliding context window (DSA Graph structure)
│   │
│   ├── audio/                  # Sensor Domain (Voice Pipelines)
│   │   ├── __init__.py
│   │   ├── ingestion.py        # Asynchronous Mic Loop & FIFO Queue
│   │   ├── transcription.py    # Local Faster-Whisper background worker
│   │   └── synthesis.py        # Local Kokoro/Piper sound player
│   │
│   └── automation/             # Hardware Actuator Domain (Windows OS Control)
│       ├── __init__.py
│       ├── monitor_tools.py    # Windows Win32 API window shifting scripts
│       └── web_dashboard/      # Local dashboard layout
│           ├── index.html
│           ├── style.css
│           └── script.js
│
└── colab_server/               # Cloud Infrastructure (Runs on Google Colab)
    └── inference_api.py        # FastAPI script hosting your custom LLM weights
```

## 🧠 Core Components & Responsibilities

### 1. Root Configuration & Entry Point
- **`requirements.txt`**: Houses your local python libraries (`google-antigravity`, `faster-whisper`, `sounddevice`, `pydantic`, `pygetwindow`, etc.).
- **`run.py`**: The master switch. It initializes the asynchronous background loops, hooks up the microphone audio triggers, and kicks off the central orchestration engine.

### 2. `app/audio/` (The I/O Processing Pipeline)
This directory acts as the sensory system for the agent.
- **`ingestion.py`**: Spins up the hardware driver stream, captures microphone data chunks, and dumps them continuously into an async FIFO queue.
- **`transcription.py`**: Constantly pops raw audio arrays off that queue, structures them using an optimized memory buffer, and uses local Whisper code to yield clean strings.
- **`synthesis.py`**: Receives incoming character streams from the agent, synthesizes them instantly into raw audio waves locally, and pumps them out of your speakers.

### 3. `app/agent/` (The Antigravity Center)
This is where the magic happens. Antigravity takes full authority here.
- **`pipeline.py`**: Initializes the Antigravity Runtime and registers your local tools. When a transcribed sentence arrives, it packages it, makes an async call across a secure tunnel to your custom model on Colab, and expects either structural JSON tool dispatches or conversational speech replies back.
- **`memory.py`**: Manages the sliding window context. Stores turn-history using clean graph structures rather than simple array appends to keep lookups highly efficient.

### 4. `app/automation/` (The OS Execution Arm)
This houses your local "superpowers" that the LLM can call.
- **`monitor_tools.py`**: Contains your native Python system functions wrapped as explicitly typed Antigravity actions (e.g., launching web dashboards on specific monitors using pixel coordinates).
- **`web_dashboard/`**: A lightweight, custom frontend that loads into a borderless browser instance on your secondary monitors when triggered, pulling up live widgets and telemetry feeds.

### 5. `colab_server/` (The Remote Compute Endpoint)
- **`inference_api.py`**: A lightweight FastAPI script that runs directly in your Google Colab session. It receives incoming prompt tensors via an exposed network tunnel endpoint and pipes back the generated model tokens instantly.

---

## 🛠️ Required Tools for Building F.R.I.D.A.Y

To successfully build and run this architecture, you will need the following tools, accounts, and hardware:

### 1. Software & OS
- **Windows OS**: Essential for Win32 API hooks and `pygetwindow` execution.
- **Python 3.10+**: Core programming language.
- **Git**: For version control.

### 2. Python Dependencies (`requirements.txt`)
- `google-antigravity`: To orchestrate the agentic loops and tool calling schemas.
- `faster-whisper`: For high-speed, local speech-to-text processing.
- `sounddevice` & `numpy`: To interact with hardware audio drivers (Microphone/Speakers).
- `pydantic`: For structured data validation.
- `pygetwindow` / `pywin32`: To control and shift windows across your Windows monitors.
- `fastapi` & `uvicorn`: For the Google Colab server endpoint.
- `python-dotenv`: To load secrets from your `.env` file.

### 3. Cloud & Infrastructure Accounts
- **Google Colab Account**: To run the `inference_api.py` and host the heavy LLM weights using free/paid GPUs.
- **Ngrok Account**: To expose your Colab FastAPI server securely to your local Windows machine via a persistent tunnel.

### 4. Hardware Requirements
- **Microphone**: For voice ingestion.
- **Speakers/Headphones**: For audio synthesis feedback.
- **Multiple Monitors**: Necessary to leverage the `monitor_tools.py` and dedicated `web_dashboard` features.
