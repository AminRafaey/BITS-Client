import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}connect`;

export async function sendTextMesage(mobileNumbers, message) {
  try {
    const res = await axios.post(endPointApi, {
      mobileNumbers,
      message,
    });
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
