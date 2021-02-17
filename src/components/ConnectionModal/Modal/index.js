import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import QrCode from '../QrCode';
import {
  useConnectStatusDispatch,
  updateStatus,
} from '../../../Context/ConnectStatus';
import { getQrCode } from '../../../api/connection';
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

const Transition = React.forwardRef(function Transition(props, ref) {
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
  const connectStatusDispatch = useConnectStatusDispatch();

  useEffect(() => {
    openModal && getQrCode(setQrString, setOpen, handleAfterScan);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAfterScan = (status) => {
    setOpen(false);
    setOpenModal(false);
    updateStatus(connectStatusDispatch, {
      status: status,
    });
  };

  return (
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
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
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
  );
}

Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
