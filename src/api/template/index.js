import config from '../../config.json';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}template`;
import axiosConfig from '../AxiosConfig';

export async function getTemplates() {
  try {
    const res = await axiosConfig(endPointApi, 'get');

    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      toastActions.error(ex.message);
      throw ex.message;
    }
    throw '';
  }
}

export async function createTemplate(template) {
  try {
    const res = await axiosConfig(endPointApi, 'post', undefined, template);

    toastActions.success('Template created successfully');
    return res.data.field.data;
  } catch (ex) {
    if (ex !== 'Error Handled') {
      throw ex;
    }
    throw '';
  }
}

export async function updateTemplate(_id, template) {
  try {
    // const res = await axios.put(endPointApi, template);
    // toastActions.success('Template updated successfully');
    // return res.data.field.data;
    return { _id, ...template, createdAt: new Date() };
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Please check your internet connection';
    } else {
      throw ex.response.data.field;
    }
  }
}
