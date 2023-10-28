const initialState = {
    FOGETPASSWORD: '',
}

const FogetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'fogetpassword':
            return { ...state, FOGETPASSWORD: action.payload, loading: false };
        default:
            return state;
    }
};

export default FogetPasswordReducer;