import React from 'react';
import PropTypes from 'prop-types';
import { Button, SecondaryButton } from '../../../HOC';
import { useLeadsDispatch, removeLeads } from '../../../../Context/Lead';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function DeleteAlert(props) {
  const { open, setOpen, selectedCount } = props;
  const leadsDispatch = useLeadsDispatch();

  const handleSubmit = () => {
    removeLeads(leadsDispatch, {});
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
      <DialogTitle id="alert-dialog-title">
        {selectedCount > 1 ? 'Bulk Delete?' : 'Delete?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleted contacts can't be restore. Are you sure you want to delete{' '}
          {selectedCount} contacts?
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
  selectedCount: PropTypes.number.isRequired,
};
export default DeleteAlert;
