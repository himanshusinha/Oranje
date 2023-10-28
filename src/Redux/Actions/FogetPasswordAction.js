import { API } from '../Utils/BaseUrl';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from '../../components/showToast';
import axios from 'axios';

export const FogetPasswordAction = (params) => {
  return async dispatch => {
    if (params) {
      const requestBody = JSON.stringify({
        email: params.email,
      });

      try {
        const response = await fetch('http://16.171.47.172:5000/api/colaborador/forget-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestBody,
        });

        const data = await response.json();
        console.log("Response from the server:", data);
          
        if (data.status === true) {
          dispatch({ type: 'fogetpassword', payload: data });
        } else if (data.status === false) {
          dispatch({ type: 'fogetpassword', payload: data });
          showToast(data.message); // Make sure you have showToast function available
        }
      } catch (error) {
        console.error("Error:", error);
        showToast("An error occurred");
      }
    }
  };
};
