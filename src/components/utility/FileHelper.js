/*
Parameters:
files : array of file objects
options = {limit?: maxNumber, type?: 'image'| 'pdf' | 'any', size?: numberInKB}
Return:
errors object
Usage:
if(errors.limit) console.log(errors.limit);
Note:
for single file check files parameter should be [file];
*/

export default function validateFile(files, options) {
  const errors = { limit: '', type: '', size: '' };
  maxSelectFile(files, options, errors);
  checkMimeType(files, options, errors);
  checkFileSize(files, options, errors);

  if (errors.limit || errors.type || errors.size) return errors;
  else return null;
}

const maxSelectFile = (files, options, errors) => {
  if (!options.limit) return null;

  if (files.length > options.limit)
    errors.limit = 'Only ' + options.limit + ' file(s) can be uploaded';
};

const checkMimeType = (files, options, errors) => {
  if (!options.type) return true;

  let types = null;
  if (options.type === 'image')
    types = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/bmp',
      'image/tiff',
      'image/gif',
    ];
  else if (options.type === 'video')
    types = [
      'video/mpeg',
      'video/mp4',
      'video/quicktime',
      'video/webm',
      'video/3gpp',
      'video/3gpp2',
      'video/3gpp-tt',
      'video/H261',
      'video/H263',
      'video/H263-1998',
      'video/H263-2000',
      'video/H264',
    ];
  else if (options.type === 'pdf') types = ['application/pdf'];
  else if (options.type === 'any') return true;

  for (let i = 0; i < files.length; i++) {
    if (types.every((type) => files[i].type !== type)) {
      errors.type = 'Please select a valid  "' + options.type + '" file';
      break;
    }
  }
};

const checkFileSize = (files, options, errors) => {
  if (!options.size) return true;

  for (let i = 0; i < files.length; i++) {
    if (files[i].size / 1000 > options.size) {
      errors.size =
        'Files greater than ' + options.size + ' KB are not allowed';
      break;
    }
  }
};
