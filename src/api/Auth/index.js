import config from '../../config.json';
const endPointApi = `${config.baseUrl}auth`;
import { isEmailValid } from '../../components/Forms/Lead';
import axiosConfig from '../AxiosConfig';

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

export async function verifyEmployeeAccount(employeeId, userName, password) {
  try {
    const res = await axiosConfig(
      endPointApi + '/employeeAccount',
      'post',
      undefined,
      {
        employeeId,
        userName,
        password,
      }
    );

    return { token: res.headers['x-auth-token'], data: res.data.field.data };
  } catch (ex) {
    if (ex !== 'Error Handled') {
      throw ex.message;
    }
    throw '';
  }
}
