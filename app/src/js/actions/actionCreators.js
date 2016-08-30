export function requestAddRecipe() {
    return {
        type: 'ADD_RECIPE'
    }
}

export function addRecipeSuccess() {
    return {
        type: 'ADD_RECIPE_SUCCESS'
    }
}

export function addRecipeError() {
    return {
        type: 'ADD_RECIPE_ERROR'
    }
}

export function receivedRecipes(recipes) {
    return {
        type: 'RECEIVED_RECIPES',
        recipes
    }
}