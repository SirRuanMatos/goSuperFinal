export default function user(state = [], action) {
    switch (action.type) {
        case 'SET_USER':
            return {user: action.user}
            break;
    
        default:
            return state;
            break;
    }
}