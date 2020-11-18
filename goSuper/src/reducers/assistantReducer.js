
export default function assistant(state = [], action) {
    switch (action.type) {
        case 'SET_ASSISTANT_ACTION':
            return {assistant: action.assistant}
            break;
        default:
            return state;
            break;
    }
}