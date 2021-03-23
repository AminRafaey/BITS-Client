import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LabelMultiSelect from '../index';
import { Button, SecondaryButton } from '../../../HOC';
import { Transition } from '../../../ConnectionModal/Modal';
import {
  useLeadsState,
  useLeadsDispatch,
  addLabels,
  removeLabels,
} from '../../../../Context/Lead';
import { addLabelsInLeads, removeLabelsFromLeads } from '../../../../api/Lead';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

function AddLabel(props) {
  const { openModal, setOpenModal, selectedCount, type } = props;
  const leadsState = useLeadsState();
  const leadsDispatch = useLeadsDispatch();
  const [labels, setLabels] = useState({ labels: [] });

  const handleClose = () => {
    setLabels({ labels: [] });
    setOpenModal(false);
  };

  const handleSubmit = () => {
    if (labels.labels.length < 1) return;
    const selectedLeads = [];
    leadsState.map(
      (l, index) =>
        l.selected && selectedLeads.push({ _id: l._id, index: index })
    );
    type === 'Add' &&
      addLabelsInLeads({ selectedLeads: selectedLeads, labels: labels.labels })
        .then((res) => {
          addLabels(leadsDispatch, {
            selectedLeads: selectedLeads,
            labels: labels.labels,
          });
          setLabels({ labels: [] });
          handleClose();
        })
        .catch((err) => console.log('Please try again'));

    type === 'Remove' &&
      removeLabelsFromLeads({
        selectedLeads: selectedLeads,
        labels: labels.labels,
      })
        .then((res) => {
          removeLabels(leadsDispatch, {
            selectedLeads: selectedLeads,
            labels: labels.labels,
          });
          setLabels({ labels: [] });
          handleClose();
        })
        .catch((err) => console.log('Please try again'));
  };
  return (
    <Dialog
      open={openModal}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        {type} label to {selectedCount} selected contacts
      </DialogTitle>
      <DialogContent>
        <LabelMultiSelect personInfo={labels} setPersonInfo={setLabels} />
      </DialogContent>
      <DialogActions style={{ paddingRight: 24 }}>
        <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
        <Button onClick={handleSubmit}>{type}</Button>
      </DialogActions>
    </Dialog>
  );
}

AddLabel.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};
export default AddLabel;
