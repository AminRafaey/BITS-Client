import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import QrCode from '../QrCode';
import InfoAlert from '../../Assets/InfoAlert';
import { toastActions } from '../../Toast';
import {
  useConnectStatusDispatch,
  updateStatus,
} from '../../../Context/ConnectStatus';
import {
  useChatState,
  useChatDispatch,
  loadChats,
  addMessage,
  addUnread,
  addMessages,
  addNewChat,
} from '../../../Context/Chat';
import {
  IconButton,
  Typography,
  Dialog,
  Zoom,
  withStyles,
  DialogContent,
  Grid,
  Box,
  styled,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { useSocketState } from '../../../Context/Socket';
const ContentWrapper = styled(Box)({
  padding: '35px 0px 0px 50px',
});
const QrCodeWrapper = styled(Box)({
  padding: '25px 0px 50px 50px',
});

const ContentTyp = styled(Typography)({
  fontSize: 18,
  paddingBottom: 22,
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
  },
});

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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

export default function Modal(props) {
  const { openModal, setOpenModal } = props;
  const [open, setOpen] = useState(false);
  const [qrString, setQrString] = useState('');
  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const currentConnRef = useRef();
  const connectStatusDispatch = useConnectStatusDispatch();
  const chatState = useChatState();
  const chatStateRef = useRef();
  const chatDispatch = useChatDispatch();
  const socket = useSocketState();

  useEffect(() => {
    if (openModal) {
      currentConnRef.current = new Date().toString();
      socket.emit('get-qr', currentConnRef.current);
    }
  }, [openModal]);
  useEffect(() => {
    chatStateRef.current = chatState;
  }, [chatState]);
  useEffect(() => {
    socket.on('no-qr', () => {
      handleClose();
      setOpenModal(false);
      toastActions.error(
        'Connection timed out, Please check you internet connection and try again.'
      );
    });
    socket.on('get-qr', (res) => {
      currentConnRef.current == res.currentConnRef && setQrString(res.qr);
    });
    socket.on('connection-status', (res) => {
      if (res === 'success') {
        toastActions.success('Connected to a WhatsApp successfully.');
        handleClose();
      } else {
        handleAfterScan(false);
        setOpenModal(false);
        toastActions.error('Connection timed out, Please try again.');
      }
    });
    // socket.on('contacts-received', (res) => {
    //   console.log(res);
    // });
    socket.on('chats-received', (res) => {
      res.length !== 0 && toastActions.success('Chats recieved successfully');
      if (chatState.length < 1 && res.length !== 0) {
        loadChats(chatDispatch, {
          chats: res,
        });
      }
      updateStatus(connectStatusDispatch, {
        status: true,
      });
    });
    socket.on('disconnected', (res) => {
      if (res.currentConnRef == currentConnRef.current) {
        toastActions.warning(res.message);
        updateStatus(connectStatusDispatch, {
          status: false,
        });
        setAlertMessage(
          'Disconnected from WhatsApp, please connect again to continue...'
        );
        setOpenInfoAlert(true);
        setOpenModal(false);
      }
    });
    socket.on('get-contact-messages', getMessagesHandler);

    socket.on('chat-new', (res) => {
      addNewChat(chatDispatch, {
        chat: { ...res, messages: [] },
      });
    });
    socket.on('new-message', (res) => {
      const chat = chatStateRef.current.find(
        (c) => c.jid === res.key.remoteJid
      );
      if (chat && chat.messages ? chat.messages.length < 1 : true) {
        socket.emit('get-contact-messages', res.key.remoteJid);
      } else if (chat) {
        addMessage(chatDispatch, {
          jid: res.key.remoteJid,
          message: res,
        });
        addUnread(chatDispatch, {
          jid: res.key.remoteJid,
          unreadCount: 1,
        });
      }
    });
    return () => {
      socket.off('no-qr');
      socket.off('get-qr');
      socket.off('connection-status');
      socket.off('chats-received');
      socket.off('disconnected');
      socket.off('new-message');
      socket.off('get-contact-messages', getMessagesHandler);
      socket.off('chat-new');
    };
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
    setQrString('');
  };

  const handleCloseIconClick = () => {
    setOpenModal(false);
    setOpen(false);
    setQrString('');
  };

  useEffect(() => {
    if (qrString) {
      setOpen(true);
    }
  }, [qrString]);

  const getMessagesHandler = (res) => {
    addMessages(chatDispatch, {
      jid: res.jid,
      messages: res.messages.messages,
    });
  };

  const handleAfterScan = (status) => {
    handleClose();
    updateStatus(connectStatusDispatch, {
      status: status,
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        fullWidth={true}
        maxWidth={'md'}
        scroll={'body'}
        TransitionComponent={Transition}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleCloseIconClick}
        >
          Connect to WhatsApp
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container id="scroll-dialog-description">
            <Grid item xs={8}>
              <ContentWrapper>
                <ContentTyp>1- Open WhatsApp on your phone.</ContentTyp>
                <ContentTyp>
                  2- Tap <b>Menu</b> and <b>Setting</b> and <b>WhatsApp Web</b>.
                </ContentTyp>
                <ContentTyp>
                  3- Point your phone to this screen to capture the code.
                </ContentTyp>
              </ContentWrapper>
            </Grid>
            <Grid item xs={4}>
              <QrCodeWrapper>
                <QrCode qrString={qrString} />
              </QrCodeWrapper>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <InfoAlert
        open={openInfoAlert}
        setOpen={setOpenInfoAlert}
        title={'WhatsApp'}
        message={alertMessage}
      />
    </React.Fragment>
  );
}

Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
