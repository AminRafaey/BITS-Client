import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}template`;

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
