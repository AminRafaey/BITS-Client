import React from 'react';
import PropTypes from 'prop-types';
import { Button, SecondaryButton } from '../../../HOC';
import { removeLabel as removeLabelFromApi } from '../../../../api/label';
import {
  useLabelDispatch,
  addLabel,
  removeLabel,
} from '../../../../Context/Label';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function DeleteAlert(props) {
  const { open, setOpen, selectedLabel, selectedLabelId } = props;

  const labelDispatch = useLabelDispatch();

  const handleSubmit = () => {
    removeLabelFromApi(selectedLabel._id)
      .then((res) => {})
      .catch((err) => {
        addLabel(labelDispatch, {
          label: selectedLabel,
          _id: selectedLabel._id,
        });
      });
    removeLabel(labelDispatch, { selectedLabelId });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleted label can't be restore. Are you sure you want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SecondaryButton onClick={handleClose} autoFocus>
          No
        </SecondaryButton>
        <Button onClick={handleSubmit}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  selectedLabel: PropTypes.object,
  selectedLabelId: PropTypes.string,
};
export default DeleteAlert;
