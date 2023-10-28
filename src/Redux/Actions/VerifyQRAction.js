import { API } from '../Utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from '../../components/showToast';

export const verifyQRAction = (params) => {
  return async (dispatch) => {
    if (params) {
      try {
        const token = await AsyncStorage.getItem('userToken');
        // console.log("token", token);

        const requestBody = {
          qr_code: params.qr_code,
          latitude: params.latitude,
          longitude: params.longitude,
        };
        console.log("requestBody", requestBody);

        const response = await fetch(`${API.BaseUrl}/api/colaborador/verify-qr`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        console.log("Response from the server:", data);
      //  showToast(data.message)
        if (data.status === true) {
          dispatch({ type: 'verifyqr', payload: data });
        } else if (data.status === false) {
          dispatch({ type: 'verifyqr', payload: data });
          showToast(data.message); // Make sure you have showToast function available
        }
      } catch (error) {
        console.error("Error:", error);
        showToast("An error occurred");
      }
    }
  };
};
