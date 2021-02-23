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
