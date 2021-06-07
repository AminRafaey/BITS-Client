import validateFile from '../utility/FileHelper';

export const handleCSVChange = (e, setSelectedCSV, setError, type, size) => {
  const files = e.target.files;
  const errors = validateFile(files, { limit: 1, type: type, size: size });
  if (!errors) {
    setSelectedCSV(files[0]);
    setError('');
  } else {
    setError(errors.limit + errors.type + errors.size);
  }
};
