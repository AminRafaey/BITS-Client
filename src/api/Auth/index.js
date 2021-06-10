import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}auth`;
import { isEmailValid } from '../../components/Forms/Lead';

export async function auth(email, password) {
  try {
    const validEmail = isEmailValid(email);
    const res = await axios.post(endPointApi, {
      ...(validEmail && { email: email }),
      ...(!validEmail && { userName: email }),
      password,
    });
    return { token: res.headers['x-auth-token'], data: res.data.field.data };
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw new Error('Please check your internet connection');
    } else {
      throw ex.response.data.field.message;
    }
  }
}
