import pygetwindow as gw
from pydantic import BaseModel, Field

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
