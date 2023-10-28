const initialState = {
    OTP: '',
}

const OtpReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'otp':
            return { ...state, OTP: action.payload, loading: false };
        default:
            return state;
    }
};

export default OtpReducer;