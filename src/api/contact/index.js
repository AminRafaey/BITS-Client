import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}contact`;

export async function getContacts() {
  try {
    const res = await axios.get(endPointApi);
    return res.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      return {};
    } else {
      alert('Server Error!');
      return {};
    }
  }
}
