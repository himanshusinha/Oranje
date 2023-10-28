import { API } from '../Utils/BaseUrl';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from '../../components/showToast';
import axios from 'axios';

export const ResetPasswordAction = (params) => {
  return async dispatch => {
    if (params) {
      const requestBody = {
        email: params.email,
        password:params.password,
        repeat_password:params.repeat_password,
      };

      try {
        const response = await axios.post(`${API.BaseUrl}/api/colaborador/reset-password`,
         requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;
        // console.log("Response from the server:", data);

        if (data.status === true) {
          dispatch({ type: 'resetpassword', payload: data });
        } else if (data.status !== false) {
          dispatch({ type: 'resetpassword', payload: data });
          showToast(data.message); // Make sure you have showToast function available
        }
      } catch (error) {
        console.error("Error:", error);
        showToast("An error occurred");
      }
    }
  };
};
