function categories(state = {}, action) {
    switch (action.type) {
        case 'CATEGORIES_FOUND':
            return {
                ...state,
                list: action.categories
            }
            break;
        default:
            return state;
    }
};

export default categories;