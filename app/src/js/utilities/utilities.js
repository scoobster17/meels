export function convertRecipesToArray(recipes) {

    let recipesArray = [];

    // check recipes argument is array, if not convert to array
    if (!Array.isArray(recipes)) {
        for (var recipe in recipes) {
            recipesArray.push(recipes[recipe]);
        }
        return recipesArray;
    } else {
        return recipes;
    }
}