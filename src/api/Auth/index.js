import config from '../../config.json';
const endPointApi = `${config.baseUrl}auth`;
import { isEmailValid } from '../../components/Forms/Lead';
import axiosConfig from '../AxiosConfig';
import axios from 'axios';

export async function auth(email, password) {
  try {
    const validEmail = isEmailValid(email);
    const res = await axiosConfig(
      endPointApi,
      'post',
      undefined,
      {
        ...(validEmail && { email: email }),
        ...(!validEmail && { userName: email }),
        password,
      },
      false
    );
    return { token: res.headers['x-auth-token'], data: res.data.field.data };
  } catch (ex) {
    if (ex !== 'Error Handled') {
      throw ex.message;
    }
    throw '';
  }
}

export async function verifyEmployeeAccount(token, userName, password) {
  try {
    axios.defaults.headers.common['x-auth-token'] = token;
    const res = await axios.post(endPointApi + '/employeeAccount', {
      userName: userName,
      password: password,
    });

    return { token: res.headers['x-auth-token'], data: res.data.field.data };
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
    } else if (ex.response.status === 401 || ex.response.status === 500) {
      toastActions.error(ex.response.data.field.message);
    } else {
      throw ex.response.data.field.message;
    }
  }
}
