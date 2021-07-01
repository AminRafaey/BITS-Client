import axios from 'axios';
import config from '../config.json';
import { toastActions } from '../components/Toast';
import { getUserStateRef } from '../Context/User';

export default async function axiosConfig(
  url,
  method,
  params,
  data,
  tokenCheckReq = true,
  token
) {
  try {
    if (tokenCheckReq) {
      const AUTH_TOKEN = getUserStateRef().token;

      if (AUTH_TOKEN) {
        axios.defaults.headers.common['x-auth-token'] = AUTH_TOKEN;
      } else {
        window.location.href = 'http://localhost:3000/signIn';
        return;
      }
    }
    console.log(token);
    if (token) axios.defaults.headers.common['x-auth-token'] = token;
    const res = await axios({
      method: method,
      url: url,
      ...(params && { params: params }),

      ...(data && {
        data: {
          ...data,
        },
      }),
    });
    return res;
  } catch (ex) {
    console.log(ex);
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
    } else if (ex.response.status === 401 || ex.response.status === 500) {
      toastActions.error(ex.response.data.field.message);
    } else {
      throw ex.response.data.field;
    }
    throw 'Error Handled';
  }
}
