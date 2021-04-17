import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LabelMultiSelect from '../index';
import { Button, SecondaryButton } from '../../../HOC';
import stateCloner from '../../../utility/StateCloner';
import { Transition } from '../../../ConnectionModal/Modal';
import {
  useLeadsState,
  useLeadsDispatch,
  addLabels,
  removeLabels,
  loadLeads,
} from '../../../../Context/Lead';
import { updateLeadsLabels } from '../../../../api/Lead';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Box,
} from '@material-ui/core';

const SelectWrapper = styled(Box)({
  maxWidth: 330,
});
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
    if (type === 'Add') {
      let updatedLeads = stateCloner(leadsState).filter((l) => l.selected);
      updatedLeads.map((s, index) => {
        labels.labels.map((l) => {
          !updatedLeads[index]['labels'].find((c) => c == l._id) &&
            updatedLeads[index]['labels'].push(l._id);
        });
      });
      updateLeadsLabels(updatedLeads, stateCloner(leadsState))
        .then((res) => {})
        .catch((err) => {
          alert(err.error.message);
          loadLeads(leadsDispatch, { leads: err.prevState });
        });
      addLabels(leadsDispatch, {
        selectedLeads: selectedLeads,
        labels: labels.labels,
      });
      setLabels({ labels: [] });
      handleClose();
    } else if (type === 'Remove') {
      let updatedLeads = stateCloner(leadsState).filter((l) => l.selected);
      updatedLeads.map((s, index) => {
        labels.labels.map((l) => {
          updatedLeads[index]['labels'] = updatedLeads[index]['labels'].filter(
            (c) => c !== l._id
          );
        });
      });

      updateLeadsLabels(updatedLeads, stateCloner(leadsState))
        .then((res) => {})
        .catch((err) => {
          alert(err.error.message);
          loadLeads(leadsDispatch, { leads: err.prevState });
        });

      removeLabels(leadsDispatch, {
        selectedLeads: selectedLeads,
        labels: labels.labels,
      });
      setLabels({ labels: [] });
      handleClose();
    }
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
        <SelectWrapper>
          <LabelMultiSelect personInfo={labels} setPersonInfo={setLabels} />
        </SelectWrapper>
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
