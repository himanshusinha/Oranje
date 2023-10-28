import showToast from '../../components/showToast';
import { API } from '../Utils/BaseUrl';
import axios from 'axios';

export const SingupAction = (params) => {
  var formData = new FormData();
  formData.append('country', params.country);
  formData.append('state', params.state);
  formData.append('city', params.city);
  formData.append('id', params.id);
  formData.append('name', params.name);
  formData.append('surname', params.surname);
  formData.append('mail', params.mail);
  formData.append('password', params.password);
  formData.append('repeat_password', params.repeat_password);
  formData.append('identity_document', params.identity_document);
  formData.append('attach_passport', params.attach_passport);
  formData.append('attach_work_visa', params.attach_work_visa);
  formData.append('attach_photo', params.attach_photo);
  console.log("Form Data:", formData);

  return async (dispatch) => {
    if (params) {
      try {
        const response = await axios.post(
          `${API.BaseUrl}/api/colaborador/sign-up`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        const data = response.data;
        // console.log("Response from the server:", data);
        if (data.status === true) {
          dispatch({ type: 'singup', payload: data });
        } else if (data.status !== false) {
          dispatch({ type: 'singup', payload: data });
          // You can handle the response here as needed
        }
      } catch (error) {
        // console.error("Error:", error.response.data.message);
          showToast( error.response.data.message)
        // Handle the error appropriately
      }
    }
  };
};
