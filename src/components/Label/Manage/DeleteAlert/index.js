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
  useLeadsState,
  useLeadsDispatch,
  removeLabels as removeLabelsFromLeads,
  addLabels as addLabelsfromLeads,
} from '../../../../Context/Lead';

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
  const leadsDispatch = useLeadsDispatch();
  const leadsState = useLeadsState();

  const handleSubmit = () => {
    removeLabelFromApi(selectedLabel._id)
      .then((res) => {})
      .catch((err) => {
        addLabel(labelDispatch, {
          label: selectedLabel,
          _id: selectedLabel._id,
        });
        addLabelsfromLeads(leadsDispatch, {
          selectedLeads: leadsState.map((l, i) => ({ _id: l._id, index: i })),
          labels: [selectedLabel],
        });
      });
    removeLabel(labelDispatch, { selectedLabelId });
    removeLabelsFromLeads(leadsDispatch, {
      selectedLeads: leadsState.map((l, i) => ({ _id: l._id, index: i })),
      labels: [selectedLabel],
    });
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
          The deleted label can't be restored and this label will be removed
          from all of the contacts. Are you sure you want to delete it?
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
