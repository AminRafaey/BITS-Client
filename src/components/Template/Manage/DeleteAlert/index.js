import React from 'react';
import PropTypes from 'prop-types';
import { Button, SecondaryButton } from '../../../HOC';
import { removeLeads as removeLeadsFromApi } from '../../../../api/Lead';
import {
  useTemplateDispatch,
  addTemplate,
  removeTemplate,
} from '../../../../Context/Template';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function DeleteAlert(props) {
  const { open, setOpen, selectedTemplate, selectedTemplateIndex } = props;

  const templateDispatch = useTemplateDispatch();

  const handleSubmit = () => {
    // removeLeadsFromApi(selectedTemplate._id)
    //   .then((res) => {})
    //   .catch((err) => {
    //     addTemplate(templateDispatch, { selectedTemplate });
    //   });
    removeTemplate(templateDispatch, { selectedTemplateIndex });
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
          Deleted template can't be restore. Are you sure you want to delete?
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
  selectedTemplate: PropTypes.object,
  selectedTemplateIndex: PropTypes.number,
};
export default DeleteAlert;
