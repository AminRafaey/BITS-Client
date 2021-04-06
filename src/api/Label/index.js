import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}label`;
import { labels } from '../../Static/Label';

export async function getLabels() {
  try {
    const res = await axios.get(endPointApi + '/all');
    return res.data.field.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      return [];
    } else {
      alert('Server Error!');
      return [];
    }
  }
}

export async function createLabel(label) {
  try {
    // const res = await axios.post(endPointApi, label);
    // return res.data;
    return { _id: 100, ...label };
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      throw new Error('Please check your internet connection');
    } else {
      alert('Server Error!');
      throw new Error('Server Error!');
    }
  }
}
