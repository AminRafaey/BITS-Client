import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Alert } from '../../../../HOC';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { handleMediaChange } from '../../../utility';

const ImageUploadWrapper = styled(Box)({
  textAlign: 'center',
  padding: 20,
  borderBlock: '3px dashed #CCC',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  minHeight: 260,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export default function SingleFileDropZone(props) {
  const { media, setMedia, handleClose } = props;
  const [onDragEnterState, setOnDragEnterState] = useState(false);
  const [error, setError] = useState('');
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept:
      '.png, .jpg, .jpeg, .mpeg, .mp4, .quicktime, .webm, .3gpp, .3gpp2, .3gpp-tt, .H261, .H263, .H263-1998, .H263-2000, .H264, .pdf',
    onDragEnter: () => setOnDragEnterState(true),
    onDragLeave: () => setOnDragEnterState(false),
    onDrop: () => setOnDragEnterState(false),
  });

  useEffect(() => {
    fileRejections.length > 0 &&
      setError('Please select a valid image, video or pdf file.');
  }, [fileRejections]);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleMediaChange(acceptedFiles, setMedia, setError, 16999);
    }
  }, [acceptedFiles]);

  return (
    <Box>
      <ImageUploadWrapper
        {...getRootProps()}
        style={{
          ...(onDragEnterState && { borderColor: '#1488FC' }),
        }}
      >
        <input
          {...getInputProps()}
          accept=".png, .jpg, .jpeg, .mpeg, .mp4, .quicktime, .webm, .3gpp, .3gpp2, .3gpp-tt, .H261, .H263, .H263-1998, .H263-2000, .H264, .pdf"
        />
        {!onDragEnterState ? (
          <p>Drag 'n' drop a file here, or click to select file</p>
        ) : (
          <p>Drop to upload</p>
        )}
        <Button>Browse file</Button>
      </ImageUploadWrapper>
      {error && (
        <>
          <Box mt={2} />
          <Alert severity="error">{error}</Alert>
        </>
      )}
    </Box>
  );
}
