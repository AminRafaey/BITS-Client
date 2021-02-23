export const calculateTimeInFormat = (date) => {
  const convertedTimeInFormat = new Date(date * 1000)
    .toLocaleString()
    .split(',')[1];
  const dateObj = new Date();
  const month = dateObj.getMonth();
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const convertedDateInFormat = new Date(date * 1000)
    .toLocaleString()
    .split(',')[0]
    .split('/');
  if (convertedDateInFormat[0] != month + 1) {
    return new Date(date * 1000).toLocaleString().split(',')[0];
  } else if (convertedDateInFormat[1] != day) {
    return new Date(date * 1000).toLocaleString().split(',')[0];
  } else if (convertedDateInFormat[2] != year) {
    return new Date(date * 1000).toLocaleString().split(',')[0];
  }
  const lastPart = convertedTimeInFormat.split(':')[2].split(' ')[1];
  return (
    convertedTimeInFormat.split(':')[0] +
    ':' +
    convertedTimeInFormat.split(':')[1] +
    ' ' +
    lastPart
  );
};
