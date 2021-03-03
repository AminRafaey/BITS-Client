import config from '../../config.json';
const endPointApi = `${config.baseUrl}contact`;

export async function getChats(loadChatsInContext) {
  try {
    const events = new EventSource(endPointApi);
    events.onmessage = (event) => {
      async function eventHandle(event) {
        const parsedData = JSON.parse(event.data);
        if (parsedData.data === 'success') {
          console.log(parsedData);
          events.close();
        } else if (parsedData.data === 'failure') {
          console.log(parsedData);
          events.close();
        }
        if (parsedData.data !== 'success' && parsedData.data !== 'failure') {
          events.close();
          console.log(parsedData);
          getChatOfSingleUser(parsedData.chats[0].jid);
          loadChatsInContext(parsedData.chats);
        }
      }
      eventHandle(event);
    };
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

export async function getChatOfSingleUser(userId) {
  try {
    console.log(userId);
    const events = new EventSource(
      `${config.baseUrl}chat/${'923366293441@s.whatsapp.net'}`
    );
    events.onmessage = (event) => {
      async function eventHandle(event) {
        const parsedData = JSON.parse(event.data);
        if (parsedData.data === 'success') {
          console.log(parsedData);
          events.close();
        } else if (parsedData.data === 'failure') {
          console.log(parsedData);
          events.close();
        }
        if (parsedData.data !== 'success' && parsedData.data !== 'failure') {
          events.close();
          console.log(parsedData);
        }
      }
      eventHandle(event);
    };
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
