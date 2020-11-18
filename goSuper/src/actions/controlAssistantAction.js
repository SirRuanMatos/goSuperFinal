import { assistantActivated } from "../services/assistant";

export function toggleAssistant(bool) {
    if (bool) {
        assistantActivated();
    }
    return {
        type: 'TOGGLE_ASSISTANT',
        value: bool
    }
}
