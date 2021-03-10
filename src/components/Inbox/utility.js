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
  if (parseInt(convertedDateInFormat[0]) != parseInt(month + 1)) {
    return new Date(date * 1000).toLocaleString().split(',')[0];
  } else if (parseInt(convertedDateInFormat[1]) != parseInt(day)) {
    return new Date(date * 1000).toLocaleString().split(',')[0];
  } else if (parseInt(convertedDateInFormat[2]) != parseInt(year)) {
    return new Date(date * 1000).toLocaleString().split(',')[0];
  }
  // return new Date('1970-01-01T' + convertedTimeInFormat.trim() + 'Z')
  // .toLocaleTimeString({},
  //   {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
  // );

  const lastPart = convertedTimeInFormat.split(':')[2].split(' ')[1];
  return (
    convertedTimeInFormat.split(':')[0] +
    ':' +
    convertedTimeInFormat.split(':')[1] +
    ' ' +
    lastPart
  );
};
