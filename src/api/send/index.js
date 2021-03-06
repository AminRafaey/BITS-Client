import config from '../../config.json';
import axios from 'axios';
const endPointApi = `${config.baseUrl}send`;

export async function sendTextMesage(mobileNumbers, message, socket) {
  try {
    socket.emit('send-text-message', { mobileNumbers: mobileNumbers, message });
  } catch (err) {
    alert('Server Error!');
    return {};
  }
}

export async function sendMedia(data, socket, tryNo = 1) {
  try {
    const res = await axios.post(endPointApi, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.status === 200) {
      tryNo = 3;
      socket.emit(`send-${data.get('mediaType')}`, {
        mobileNumbers: data.get('mobileNumbers'),
        message: data.get('message'),
        mediaPath: res.data.field.data,
      });
    }
    return res.data;
  } catch (ex) {
    if (!ex.response) {
      alert('Please check your internet connection');
      return {};
    } else {
      if (tryNo < 3) {
        sendMedia(data, socket, tryNo + 1);
        return;
      }
      alert('Server Error!');
      return {};
    }
  }
}
