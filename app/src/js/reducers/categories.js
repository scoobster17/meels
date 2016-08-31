function categories(state = {}, action) {
    switch (action.type) {
        case 'CATEGORIES_RECEIVED':
            return {
                ...state,
                list: action.categories
            }
            break;
        case 'CATEGORIES_FOUND':
            return {
                ...state,
                used: action.categories
            }
            break;
        default:
            return state;
    }
};

export default categories;