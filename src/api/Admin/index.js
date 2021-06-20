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
