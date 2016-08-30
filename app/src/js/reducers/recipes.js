function recipes(state = {}, action) {
    switch (action.type) {

        // add recipe
        case 'ADD_RECIPE':
            return {
                ...state,
                waitingForAddRecipeResponse: true
            }
            break;
        case 'ADD_RECIPE_SUCCESS':
            return {
                ...state,
                recipeAdded: true,
                waitingForAddRecipeResponse: false
            }
            break;
        case 'ADD_RECIPE_ERROR':
            return {
                ...state,
                waitingForAddRecipeResponse: false
            }
            break;

        // get recipes
        case 'RECEIVED_RECIPES':
            return {
                ...state,
                list: action.recipes
            }
            break;

        // fallback
        default:
            return state;
    }
};

export default recipes;