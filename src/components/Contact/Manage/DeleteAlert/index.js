import React from 'react';
import PropTypes from 'prop-types';
import { Button, SecondaryButton } from '../../../HOC';
import { removeLeads as removeLeadsFromApi } from '../../../../api/Lead';
import {
  useLeadsState,
  useLeadsDispatch,
  removeLeads,
  addLeads,
  removeLead,
} from '../../../../Context/Lead';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function DeleteAlert(props) {
  const {
    open,
    setOpen,
    selectedCount,
    selectedLead,
    selectedLeadIndex,
  } = props;
  const leadsDispatch = useLeadsDispatch();
  const leadsState = useLeadsState();
  const handleSubmit = () => {
    const leads = selectedLead
      ? [{ ...selectedLead }]
      : leadsState.filter((l) => l.selected);
    removeLeadsFromApi(leads.map((l) => l._id))
      .then((res) => {})
      .catch((err) => {
        addLeads(leadsDispatch, { leads });
      });
    selectedLead
      ? removeLead(leadsDispatch, { selectedLeadIndex })
      : removeLeads(leadsDispatch, {});
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
          {selectedCount} contact{selectedCount > 1 ? 's' : ''}?
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
  selectedLead: PropTypes.object,
  selectedLeadIndex: PropTypes.number,
};
export default DeleteAlert;
