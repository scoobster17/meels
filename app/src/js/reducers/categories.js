function categories(state = {}, action) {
    switch (action.type) {
        case 'GET':
            return {
                ...state,
                waitingForAddCategoryResponse: true
            }
            break;
        default:
            return state;
    }
};

export default categories;