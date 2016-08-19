export default function recipesReducer(state = {}, action) {
    switch (action.type) {
        case 'GET':
            return {
                ...state,
                waitingForAddRecipeResponse: true
            }
            break;
        default:
            return state;
    }
};