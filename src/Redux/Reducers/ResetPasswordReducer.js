const initialState = {
    RESETPASSWORD: '',
}

const ResetPasswordReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'resetpassword':
            return { ...state, RESETPASSWORD: action.payload, loading: false };
        default:
            return state;
    }
};

export default ResetPasswordReducer;