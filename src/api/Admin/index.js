import config from '../../config.json';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}admin`;
import axiosConfig from '../AxiosConfig';

export async function createAdmin(adminData) {
  try {
    const res = await axiosConfig(
      endPointApi,
      'post',
      undefined,
      adminData,
      false
    );

    toastActions.success(res.data.field.message);
    return res.data.field;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function resendVerificationEmail(userId) {
  try {
    const res = await axiosConfig(
      endPointApi + '/resendVerificationEmail',
      'post',
      undefined,
      {userId},
      false
    );

    toastActions.success(res.data.field.message);
    return res.data.field;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}

export async function accountVerification(userId, token) {
  try {
    const res = await axiosConfig(
      endPointApi + '/accountVerification',
      'put',
      undefined,
      userId,
      false,
      token
    );

    toastActions.success(res.data.field.message);
    return { token: res.headers['x-auth-token'], data: res.data.field.data };
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex;
    }
    throw '';
  }
}
