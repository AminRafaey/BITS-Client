import config from '../../config.json';
const endPointApi = `${config.baseUrl}connect`;

export async function getQrCode(setQrString, setOpen, handleAfterScan) {
  try {
    const events = new EventSource(endPointApi);
    events.onmessage = (event) => {
      async function eventHandle(event) {
        const parsedData = JSON.parse(event.data);
        if (parsedData.data === 'Already Connected') {
          events.close();
          handleAfterScan(true);
        } else if (parsedData.data === 'success') {
          events.close();
          handleAfterScan(true);
        } else if (parsedData.data === 'failure') {
          events.close();
          handleAfterScan(false);
        }
        if (
          parsedData.data !== 'Already Connected' &&
          parsedData.data !== 'success' &&
          parsedData.data !== 'failure'
        ) {
          setOpen(true);
          setQrString(parsedData.data);
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
