import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}label`;
import { labels } from '../../Static/LabelRevamp';
export async function getLabels() {
  try {
    // const res = await axios.get(endPointApi);
    // return res.data.field.data;
    return labels;
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
    const res = await axios.post(endPointApi, label);
    return res.data;
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
