import React from 'react';
import PropTypes from 'prop-types';
import LabelMultiSelect from '../index';
import { Button } from '../../../HOC';
import { Transition } from '../../../ConnectionModal/Modal';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

function AddLabel() {
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Open form dialog</Button>
      <Dialog
        open={openModal}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Add label to 5 selected contacts</DialogTitle>
        <DialogContent>
          <LabelMultiSelect />
        </DialogContent>
        <DialogActions style={{ paddingRight: 24 }}>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddLabel.propTypes = {};
export default AddLabel;
