import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MediaUploadDialogue from '../MediaUploadDialogue';
import { Clip } from '../../../../../resources';
import { styled, Box } from '@material-ui/core';
import { DarkHoverColor, primaryColor } from '../../../../constants/theme';
const MediaSendingWrapper = styled(Box)({});

const MediaIconWrapper = styled(Box)({});

const SendWrapper = styled(Box)({
  height: 24,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1px 2px',
  '&:hover': {
    background: DarkHoverColor,
  },
  '&:active': {
    background: primaryColor,
  },
});
function MediaSending(props) {
  const { currentChatJid } = props;
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
        <SendWrapper>
          <Clip style={{ height: 18, width: 18 }} />
        </SendWrapper>
      </MediaIconWrapper>
      <MediaUploadDialogue
        open={open}
        handleClose={handleClose}
        currentChatJid={currentChatJid}
      />
    </MediaSendingWrapper>
  );
}

MediaSending.propTypes = {
  currentChatJid: PropTypes.string.isRequired,
};

export default MediaSending;
