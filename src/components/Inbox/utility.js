import { validateInboxFile, getMimeType } from '../utility/FileHelper';

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

export const formattedTime = (date) => {
  const convertedTimeInFormat = new Date(date * 1000)
    .toLocaleString()
    .split(',')[1];
  return (
    convertedTimeInFormat.split(' ')[1].split(':')[0] +
    ':' +
    convertedTimeInFormat.split(' ')[1].split(':')[1] +
    ' ' +
    convertedTimeInFormat.split(' ')[2]
  );
};
export const formatBytes = (a, b = 0) => {
  if (0 === a) return '0 Bytes';
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KB', 'MB', 'GB'][d]
  );
};

export const handleMediaChange = (files, setMedia, setMediaError, size) => {
  const errors = validateInboxFile(files, { limit: 1, size: size });
  if (!errors) {
    setMedia({ file: files[0], type: getMimeType(files) });
    setMediaError('');
  } else {
    setMediaError(errors.limit + errors.type + errors.size);
  }
};
