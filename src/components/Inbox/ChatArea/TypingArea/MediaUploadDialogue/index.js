import React, { useState } from 'react';
import { TextArea, Button } from '../../../../HOC';
import { useConnectStatusState } from '../../../../../Context/ConnectStatus';
import { useSocketState } from '../../../../../Context/Socket';
import { toastActions } from '../../../../Toast';
import { sendTextMesage, sendMedia } from '../../../../../api/send';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog as MuiDialog,
  styled,
  Typography,
  Box,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  IconButton,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import SingleFileDropZone from '../SingleFileDropZone';
const TitleTyp = styled(Typography)({
  fontSize: 16,
  fontFamily: 'medium',
});

const FileWrapper = styled(Box)({
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margininline: 52,
});
const TextAreaWrapper = styled(Box)({
  paddingInline: 15,
  display: 'flex',
  alignItems: 'center',
});
const ButtonWrapper = styled(Box)({
  paddingLeft: 15,
});

export const FileNameTyp = styled(Typography)({
  fontSize: 14,
  paddingTop: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: 8,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <TitleTyp>{children}</TitleTyp>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(() => ({
  root: {
    paddingBlock: 20,
    '&.MuiDialogContent-dividers': {
      paddingInline: 0,
    },
  },
}))(MuiDialogContent);

const Dialog = withStyles(() => ({
  root: {},
  paper: {
    maxWidth: '100%',
    minWidth: '60%',
  },
}))(MuiDialog);
export default function MediaUploadDialogue(props) {
  const { open, handleClose, currentChatJid } = props;
  const connectStatusState = useConnectStatusState();
  const socket = useSocketState();
  const [media, setMedia] = useState({});
  const [message, setMessage] = useState('');

  console.log(media, message, ['+' + currentChatJid.split('@')[0]]);

  const handleSend = () => {
    if (!connectStatusState) {
      return;
    }

    if (media.file === undefined) {
      if (!message) {
        toastActions.warning('Type message to continue ...');
        return;
      }
      sendTextMesage(['+' + currentChatJid.split('@')[0]], message, socket);
    } else if (media.file) {
      const formData = new FormData();
      formData.append(
        'mobileNumbers',
        JSON.stringify(['+' + currentChatJid.split('@')[0]])
      );
      formData.append('message', message);
      formData.append('file', media.file);
      formData.append('mediaType', media.type);
      sendMedia(formData, socket);
    }
    setMedia({});
    setMessage('');
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Add Media
      </DialogTitle>
      <DialogContent dividers>
        <SingleFileDropZone
          media={media}
          setMedia={setMedia}
          handleClose={handleClose}
        />

        <FileWrapper>
          <FileNameTyp>
            {Object.entries(media).length > 0
              ? media.file.name
              : 'No File Choosen'}
          </FileNameTyp>
        </FileWrapper>
        <TextAreaWrapper>
          <TextArea
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ButtonWrapper>
            <Button onClick={handleSend}>Send</Button>
          </ButtonWrapper>
        </TextAreaWrapper>
      </DialogContent>
    </Dialog>
  );
}
