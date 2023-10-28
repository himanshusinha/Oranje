import { API } from '../Utils/BaseUrl';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from '../../components/showToast';

export const LoginAction = (params) => {
    return async dispatch => {
        if (params) {
            const requestBody = {
                id:params.id,
                password:params.password,
                fcm_token:params.fcm_token,
            };
            try {
                const response = await fetch(`${API.BaseUrl}/api/colaborador/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                 console.log("Response from the server:", data);
                 showToast(data.message)
                if (data.status === true) {
                    if (data.token) {
                        await AsyncStorage.setItem('userToken', data.token);
                  console.log('token',data)
                    
                    }
                    dispatch({ type: 'login', payload: data });
                   
                } else if (data.status === false) {
                    dispatch({ type: 'login', payload: data });
                    showToast(data.message)
                }
            } catch (error) {
                console.error("Error:", error);
                // showToast("An error occurred"); 
            }
        }
    };
};






