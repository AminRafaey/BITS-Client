import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}send`;

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

export async function sendMedia(data) {
  try {
    const res = await axios.post(
      endPointApi + '/' + data.get('mediaType'),
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
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
