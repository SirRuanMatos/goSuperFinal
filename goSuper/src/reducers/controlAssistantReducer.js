
export default function controlAssistant(state = false, action) {
    switch (action.type) {
        case 'TOGGLE_ASSISTANT':
            return {controlAssistant: action.value}
            break;
        default:
            return state;
            break;
    }
}