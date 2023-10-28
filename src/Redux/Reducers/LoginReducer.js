const initialState = {
    LOGIN: '',
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'login':
            return { ...state, LOGIN: action.payload, loading: false };
        default:
            return state;
    }
};

export default LoginReducer;


// const initialState = {
//         data:{},
//         loading: false,
//     }
    
//     const LoginReducer = (state = initialState, action) => {
//         switch (action.type) {
//             case 'login':
//                 return { ...state, data: action.payload, loading: false };
//             default:
//                 return state;
//         }
//     };
    
//     export default LoginReducer;