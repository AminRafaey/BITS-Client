import React from 'react';
import PropTypes from 'prop-types';
import { Button, SecondaryButton } from '../../../HOC';
import { removeLeads as removeLeadsFromApi } from '../../../../api/Lead';
import {
  useEmployeeState,
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
  const {
    open,
    setOpen,
    selectedCount,
    selectedEmployee,
    selectedEmployeeIndex,
  } = props;

  const employeeDispatch = useEmployeeDispatch();
  const employeeState = useEmployeeState();
  const handleSubmit = () => {
    const employee = [{ ...selectedEmployee }];
    // removeLeadsFromApi(employees.map((l) => l._id))
    // .then((res) => {})
    // .catch((err) => {
    //   addemployee(employeeDispatch, { employees });
    // });
    removeEmployee(employeeDispatch, { selectedEmployee });
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
          Deleted employee can't be restore. Are you sure you want to delete{' '}
          {selectedCount} employee?
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
  selectedEmployee: PropTypes.object,
  selectedEmployeeIndex: PropTypes.number,
};
export default DeleteAlert;
