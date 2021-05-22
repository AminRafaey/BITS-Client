import config from '../../config.json';
import axios from 'axios';
import { toastActions } from '../../components/Toast';
const endPointApi = `${config.baseUrl}send`;

const withTimeout = (onSuccess, onTimeout, timeout) => {
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    onSuccess.apply(this, args);
  };
};

export async function sendTextMesage(mobileNumbers, message, socket) {
  socket.emit(
    'send-text-message',
    { mobileNumbers: mobileNumbers, message },
    {},
    withTimeout(
      () => {
        toastActions.success('Message sent successfully');
      },
      () => {
        toastActions.error(
          'Connection timed out, Please check your internet connection and try again'
        );
      },
      10000
    )
  );
}

export async function sendTextMesageOnGroup(groupId, message, socket) {
  socket.emit(
    'send-text-message-on-group',
    { groupId, message },
    {},
    withTimeout(
      () => {
        toastActions.success('Message sent successfully');
      },
      () => {
        toastActions.error(
          'Connection timed out, Please check your internet connection and try again'
        );
      },
      10000
    )
  );
}

export async function sendMedia(data, socket, tryNo = 1) {
  try {
    const res = await axios.post(endPointApi, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    tryNo = 3;
    socket.emit(
      `send-${data.get('mediaType')}`,
      {
        mobileNumbers: data.get('mobileNumbers'),
        message: data.get('message'),
        mediaPath: res.data.field.data,
      },
      {},
      withTimeout(
        () => {
          toastActions.success('Message sent successfully');
        },
        () => {
          toastActions.error(
            'Connection timed out, Please check your internet connection and try again'
          );
        },
        100000
      )
    );
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
