function recipes(state = {}, action) {
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

export default recipes;