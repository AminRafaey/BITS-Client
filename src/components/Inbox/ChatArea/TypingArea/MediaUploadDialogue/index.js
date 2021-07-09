import React, { useState } from 'react';
import { TextArea, Button } from '../../../../HOC';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog as MuiDialog,
  styled,
  Typography,
  DialogActions,
  Box,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  IconButton,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import SingleFileDropZone from '../SingleFileDropZone';
import { DarkBackgroundColor } from '../../../../constants/theme';
const TitleTyp = styled(Typography)({
  fontSize: 16,
  fontFamily: 'medium',
});

export const FileWrapper = styled(Box)({
  background: DarkBackgroundColor,
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  marginTop: 15,
  marginLeft: 52,
});

export const ActionsWrapper = styled(Box)({
  display: 'flex',
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
    paddingBlock: 100,
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
  const { open, handleClose } = props;
  const [media, setMedia] = useState({});
  const [message, setMessage] = useState('');
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
          <FileNameTyp>{media ? media.name : 'No File Choosen'}</FileNameTyp>
        </FileWrapper>
        <TextArea
          placeholder="Description(Optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <ActionsWrapper>
          <Button>Send</Button>
        </ActionsWrapper>
      </DialogActions>
    </Dialog>
  );
}
