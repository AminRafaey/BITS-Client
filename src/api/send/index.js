import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}send`;

export async function sendTextMesage(mobileNumbers, message, socket) {
  try {
    socket.emit('send-text-message', { mobileNumbers: mobileNumbers, message });
    toastActions.success('Message sent successfully');
  } catch (err) {
    toastActions.error('Server Error!');
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
      toastActions.success('Message sent successfully');
    }
  } catch (ex) {
    if (!ex.response) {
      toastActions.error('Please check your internet connection');
    } else {
      if (tryNo < 3) {
        sendMedia(data, socket, tryNo + 1);
        return;
      }
      toastActions.error(ex.response.data.field.message);
    }
  }
}
