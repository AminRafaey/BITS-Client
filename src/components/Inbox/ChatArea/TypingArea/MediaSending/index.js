import React, { useState } from 'react';
import MediaUploadDialogue from '../MediaUploadDialogue';
import { Clip } from '../../../../../resources';
import { styled, Box } from '@material-ui/core';

const MediaSendingWrapper = styled(Box)({});

const MediaIconWrapper = styled(Box)({});

export default function MediaSending(props) {
  const {} = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MediaSendingWrapper>
      <MediaIconWrapper onClick={handleClickOpen}>
        <Clip />
      </MediaIconWrapper>
      <MediaUploadDialogue open={open} handleClose={handleClose} />
    </MediaSendingWrapper>
  );
}

MediaSending.propTypes = {};
