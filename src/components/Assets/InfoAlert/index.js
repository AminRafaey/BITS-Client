import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  IconButton,
  Typography,
  styled,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
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
}));

const ContentTyp = styled(Typography)({
  whiteSpace: 'pre-line',
});
const MuiDialogContent = withStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingRight: theme.spacing(10),
  },
}))(DialogContent);

function InfoAlert(props) {
  const { open, setOpen, title, message } = props;
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">{title}</Typography>

        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <MuiDialogContent dividers>
        <ContentTyp>{message}</ContentTyp>
      </MuiDialogContent>
    </Dialog>
  );
}

InfoAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export default InfoAlert;
