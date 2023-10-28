import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import SinupReducer from './Reducers/SinupReducer';
import FogetPasswordReducer from './Reducers/FogetPasswordRaducer';
import OtpReducer from './Reducers/OtpReducer';
import ResetPasswordReducer from './Reducers/ResetPasswordReducer';
import LoginReducer from './Reducers/LoginReducer';
import verifyQRReducer from './Reducers/VerifyQRReducer';


const rootReducer = combineReducers(
    {
        SinupReducer:SinupReducer,
        FogetPasswordReducer:FogetPasswordReducer,
        OtpReducer:OtpReducer,
        ResetPasswordReducer:ResetPasswordReducer,
        LoginReducer:LoginReducer,
        verifyQRReducer:verifyQRReducer,
    
    }
)

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    whitelist: ['auth']
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, applyMiddleware(thunk)); 
const configureStore = () => {
    return store; 
}
export const  persistor = persistStore(store)
export default configureStore;


