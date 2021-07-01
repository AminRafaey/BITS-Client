import config from '../../config.json';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}label`;
import axiosConfig from '../AxiosConfig';

export async function getLabels() {
  try {
    const res = await axiosConfig(endPointApi + '/all', 'get');
    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
    }
    return [];
  }
}

export async function createLabel(label) {
  try {
    const res = await axiosConfig(endPointApi, 'post', undefined, label);
    toastActions.success('Label created successfully!');
    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex.message;
    }
  }
}

export async function updateLabel(label) {
  try {
    //const res = await axios.put(endPointApi, label);
    toastActions.success('Label updated successfully!');
    //return res.data.field.data;
    return label;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Please check your internet connection';
    } else {
      toastActions.error(ex.response.data.field.message);
      throw ex.response.data.field.message;
    }
  }
}
