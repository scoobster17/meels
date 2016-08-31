//////////////////////////////////////////////////
// recipes
//////////////////////////////////////////////////

// add recipe
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

export function addIngredientToRecipe(ingredient) {
    return {
        type: 'ADD_RECIPE_INGREDIENT',
        ingredient
    }
}

export function addInstructionToRecipe(instruction) {
    return {
        type: 'ADD_RECIPE_INSTRUCTION',
        instruction
    }
}

// recipes list
export function receivedRecipes(recipes) {
    return {
        type: 'RECEIVED_RECIPES',
        recipes
    }
}

//////////////////////////////////////////////////
// categories
//////////////////////////////////////////////////

// categories list
export function categoriesReceived(categories) {
    return {
        type: 'CATEGORIES_RECEIVED',
        categories
    }
}

// categories used in save recipes
export function categoriesFound(categories) {
    return {
        type: 'CATEGORIES_FOUND',
        categories
    }
}

// update selected tags on add recipe page
export function setSelectedTags(tags) {
    return {
        type: 'UPDATE_SELECTED_TAGS',
        tags
    }
}