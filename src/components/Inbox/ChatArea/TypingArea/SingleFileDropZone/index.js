import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../../../../HOC';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';

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
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: 'image/*',
    onDragEnter: () => setOnDragEnterState(true),
    onDragLeave: () => setOnDragEnterState(false),
    onDrop: () => setOnDragEnterState(false),
  });

  console.log(acceptedFiles);
  useEffect(() => {
    acceptedFiles.length > 0 && setMedia(acceptedFiles[0]);
  }, [acceptedFiles]);

  return (
    <ImageUploadWrapper
      {...getRootProps()}
      style={{
        ...(onDragEnterState && { borderColor: '#1488FC' }),
      }}
    >
      <input {...getInputProps()} accept="image/*" />
      {!onDragEnterState ? (
        <p>Drag 'n' drop a file here, or click to select file</p>
      ) : (
        <p>Drop to upload</p>
      )}
      <Button>Browse file</Button>
    </ImageUploadWrapper>
  );
}
