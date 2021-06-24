import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}template`;

export async function getTemplates() {
  try {
    const res = await axios.get(endPointApi);
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Please check your internet connection';
    } else {
      toastActions.error('Server Error!');
      throw 'Server Error!';
    }
  }
}

export async function createTemplate(template) {
  try {
    const res = await axios.post(endPointApi, template);
    toastActions.success('Template created successfully');
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
      throw 'Please check your internet connection';
    } else {
      throw ex.response.data.field;
    }
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
