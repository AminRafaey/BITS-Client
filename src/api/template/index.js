import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}template`;

export async function getTemplates() {
  try {
    const res = await axios.get(endPointApi);
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
