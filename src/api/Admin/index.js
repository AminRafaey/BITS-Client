import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}admin`;

export async function createAdmin(adminData) {
  try {
    const res = await axios.post(endPointApi, adminData);
    toastActions.success(res.data.field.message);
    return res.data.field;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Please check your internet connection';
    } else {
      toastActions.error(ex.response.data.field.message);
      throw ex.response.data.field;
    }
  }
}

export async function resendVerificationEmail(userId) {
  try {
    const res = await axios.post(endPointApi + '/resendVerificationEmail', {
      userId,
    });
    toastActions.success(res.data.field.message);
    return res.data.field;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Please check your internet connection';
    } else {
      toastActions.error(ex.response.data.field.message);
      throw ex.response.data.field;
    }
  }
}

export async function accountVerification(userId) {
  try {
    const res = await axios.put(endPointApi + '/accountVerification', {
      userId,
    });
    toastActions.success(res.data.field.message);
    return { token: res.headers['x-auth-token'], data: res.data.field.data };
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Please check your internet connection';
    } else {
      toastActions.error(ex.response.data.field.message);
      throw ex.response.data.field;
    }
  }
}
