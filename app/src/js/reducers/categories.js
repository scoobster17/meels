function categories(state = {}, action) {
    switch (action.type) {
        case 'FETCHING_CATEGORIES':
            return {
                ...state,
                fetchingCategories: true
            }
            break;
        case 'CATEGORIES_RECEIVED':
            return {
                ...state,
                list: action.categories
            }
            break;
        case 'CATEGORIES_FOUND':
            return {
                ...state,
                used: action.categories,
                fetchingCategories: false
            }
            break;
        default:
            return state;
    }
};

export default categories;