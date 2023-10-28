const initialState = {
    VERIFYQR: '',
}

const verifyQRReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'verifyqr':
            return { ...state, VERIFYQR: action.payload, loading: false };
        case 'reset_verifyqr':
            return { ...state, SINGUP: { status: false, message: '' } };
        default:
            return state;
    }
};

export default verifyQRReducer;
