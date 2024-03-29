import React from 'react';
import PropTypes from 'prop-types';
import { Button, SecondaryButton } from '../../../HOC';
import { removeEmployee as removeEmployeeFromApi } from '../../../../api/Employee';
import {
  useEmployeeDispatch,
  addEmployee,
  removeEmployee,
} from '../../../../Context/Employee';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

function DeleteAlert(props) {
  const { open, setOpen, selectedEmployee, selectedEmployeeIndex } = props;

  const employeeDispatch = useEmployeeDispatch();

  const handleSubmit = () => {
    removeEmployeeFromApi(selectedEmployee._id)
      .then((res) => {})
      .catch((err) => {
        addEmployee(employeeDispatch, {
          employeeData: selectedEmployee,
          selectedEmployeeIndex: selectedEmployeeIndex,
        });
      });
    removeEmployee(employeeDispatch, {
      selectedEmployeeIndex: selectedEmployeeIndex,
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
          Deleted employee can't be restore. Are you sure you want to delete?
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
  selectedEmployee: PropTypes.object,
  selectedEmployeeIndex: PropTypes.number,
};
export default DeleteAlert;
