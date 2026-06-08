from typing import List, Dict

class SlidingMemory:
    def __init__(self, max_turns: int = 15):
        self.max_turns = max_turns
        self.history: List[Dict[str, str]] = []

    def add_user_message(self, content: str):
        self.history.append({"role": "user", "content": content})
        self._truncate()

    def add_assistant_message(self, content: str):
        self.history.append({"role": "assistant", "content": content})
        self._truncate()

    def _truncate(self):
        # A single 'turn' is User + Assistant, so max_turns * 2
        if len(self.history) > self.max_turns * 2:
            self.history = self.history[-(self.max_turns * 2):]

    def get_context(self) -> List[Dict[str, str]]:
        return self.history
