// const initialState = {
//     SINGUP: '',
// }

// const SinupReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'singup':
//             return { ...state, SINGUP: action.payload, loading: false };
//         default:
//             return state;
//     }
// };

// export default SinupReducer;

const initialState = {
    SINGUP: { status: false, message: '' }, // Initialize with an object that matches your expected structure
  };
  
  const SinupReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'singup':
        return { ...state, SINGUP: action.payload, loading: false };
      case 'reset_signup':
        return { ...state, SINGUP: { status: false, message: '' } }; // Reset the state to its initial value
      default:
        return state;
    }
  };
  
  export default SinupReducer;
  