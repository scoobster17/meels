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
        case 'UPDATE_SELECTED_TAGS':
            return {
                ...state,
                selectedTags: action.tags
            }
            break;
        case 'ADD_RECIPE_INGREDIENT':
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient]
            }
            break;
        case 'ADD_RECIPE_INSTRUCTION':
            return {
                ...state,
                instructions: [...state.instructions, action.instruction]
            }
            break;

        // get recipes
        case 'RECEIVED_RECIPES':
            return {
                ...state,
                list: action.recipes
            }
            break;

        // get recipe (details)
        case 'RECIPE_RECEIVED':
            return {
                ...state,
                currentRecipe: action.recipe
            }
            break;

        // fallback
        default:
            return state;
    }
};

export default recipes;