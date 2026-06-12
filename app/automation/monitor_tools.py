import pygetwindow as gw
from pydantic import BaseModel, Field
import psutil
import webbrowser
import os
import time

# Pydantic struct typing enforces valid parameters for our tools
class MoveWindowParams(BaseModel):
    window_title: str = Field(..., description="Substring of the window title to target")
    x: int = Field(..., description="Target X monitor coordinate")
    y: int = Field(..., description="Target Y monitor coordinate")
    width: int = Field(1280, description="Target pixel width")
    height: int = Field(720, description="Target pixel height")

class WindowAutomation:
    @staticmethod
    def move_window(params: dict) -> str:
        """
        Win32 tool action to rearrange windows. Parses dict into strictly typed Pydantic BaseModel.
        """
        # Validate through Pydantic
        validated_params = MoveWindowParams(**params)
        
        # Win32 lookup
        windows = gw.getWindowsWithTitle(validated_params.window_title)
        if not windows:
            return f"Error: Window containing '{validated_params.window_title}' not found."
        
        target_win = windows[0]
        try:
            if target_win.isMinimized:
                target_win.restore()
            target_win.moveTo(validated_params.x, validated_params.y)
            target_win.resizeTo(validated_params.width, validated_params.height)
            return f"Successfully moved '{target_win.title}' to ({validated_params.x}, {validated_params.y})"
        except Exception as e:
            return f"Failed to move window: {str(e)}"

    @staticmethod
    def launch_dashboard(params: dict = None) -> str:
        """
        Launches the F.R.I.D.A.Y web dashboard.
        """
        try:
            dashboard_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "web_dashboard", "dist", "index.html"))
            webbrowser.open(f"file:///{dashboard_path.replace(chr(92), '/')}")
            
            # Allow time for the browser to launch
            time.sleep(2)
            
            return "Successfully launched Web Dashboard."
        except Exception as e:
            return f"Failed to launch dashboard: {str(e)}"

    @staticmethod
    def get_system_telemetry(params: dict = None) -> str:
        """
        Returns basic system telemetry (CPU and RAM usage).
        """
        try:
            cpu_usage = psutil.cpu_percent(interval=0.5)
            ram = psutil.virtual_memory()
            ram_usage = ram.percent
            ram_total = round(ram.total / (1024**3), 2)
            ram_used = round(ram.used / (1024**3), 2)
            return f"CPU Usage: {cpu_usage}% | RAM Usage: {ram_usage}% ({ram_used}GB / {ram_total}GB)"
        except Exception as e:
            return f"Failed to get system telemetry: {str(e)}"
