import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import phone from 'phone';

import TemplateMultiSelect from '../../../QuickSend/TemplateMultiSelect';
import PhoneNumber from '../../PhoneNumber';
import { Designation, InfoAlert, DateField } from '../../../Assets';
import { Button, TextField, SecondaryButton, Checkbox } from '../../../HOC';
import { Transition } from '../../../ConnectionModal/Modal';
import { isEmailValid } from '../../Lead';
import {
  useEmployeeDispatch,
  addEmployee,
  updateEmployee as updateEmployeeInContext,
} from '../../../../Context/Employee';
import { useDesignationState } from '../../../../Context/Designation';
import { useConnectStatusState } from '../../../../Context/ConnectStatus';
import { useSocketState } from '../../../../Context/Socket';
import { useUserState } from '../../../../Context/User';
import {
  createEmployee as createEmployeeApi,
  updateEmployee,
} from '../../../../api/Employee';
import { sendTextMesage } from '../../../../api/send';
import { emptySpacingRow, FieldNameRow, errorRow } from '../../Lead';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  styled,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { initEmployeeData } from '../../../constants/InitialValues';
import { toastActions } from '../../../Toast';

const LoadingWrapper = styled(Box)({
  minHeight: window.innerHeight - 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const SendMsgWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
function CreateEmployee(props) {
  const {
    openModal,
    setOpenModal,
    type,
    editingEmployee,
    selectedEmployeeIndex,
  } = props;
  const employeeDispatch = useEmployeeDispatch();
  const connectStatusState = useConnectStatusState();
  const designationState = useDesignationState();
  const socket = useSocketState();
  const user = useUserState();
  const [employeeData, setEmployeeData] = useState(initEmployeeData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [clientSideError, setClientSideError] = useState({});
  console.log(user);
  useEffect(() => {
    if (type === 'edit') {
      setEmployeeData({ ...editingEmployee });
    }
  }, []);

  useEffect(() => {
    window.localStorage.getItem('TEMPLATE') &&
      setSelectedTemplate(JSON.parse(window.localStorage.getItem('TEMPLATE')));
  }, []);

  useEffect(() => {
    Object.entries(selectedTemplate).length > 0 &&
      window.localStorage.setItem('TEMPLATE', JSON.stringify(selectedTemplate));
  }, [selectedTemplate]);
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleSend = (mobileNumber) => {
    if (!connectStatusState) {
      setAlertMessage(
        'Disconnected from WhatsApp, please connect again to continue...'
      );
      setOpenInfoAlert(true);
      return;
    }
    if (!selectedTemplate.content) {
      toastActions.warning('Please Select template to send WhatsApp');
      return;
    }
    if (!mobileNumber) {
      toastActions.warning(
        'Please Select valid mobile number to send WhatsApp'
      );
      return;
    }
    sendTextMesage([mobileNumber], selectedTemplate.content, socket);
    return true;
  };

  useEffect(() => {
    error.name === 'mobileNumber' &&
      phone(employeeData.phoneCode + employeeData.phone).length !== 0 &&
      setError({});
  }, [employeeData.phone]);
  const handleSubmit = (btnType) => {
    const phoneCode = employeeData.phoneCode;
    const mobileNumber = employeeData.phone;
    if (!employeeData.firstName) {
      setClientSideError({
        ...clientSideError,
        firstName: { message: 'This Field is required' },
      });
      return;
    } else if (!isEmailValid(employeeData.email)) {
      !employeeData.email
        ? setClientSideError({
            ...clientSideError,
            email: { message: 'This Field is required' },
          })
        : setClientSideError({
            ...clientSideError,
            email: { message: 'Invalid Email' },
          });
      return;
    } else if (phone(phoneCode + mobileNumber).length === 0) {
      !employeeData.phone
        ? setError({ name: 'mobileNumber', message: 'This Field is required' })
        : setError({ name: 'mobileNumber', message: 'Invalid mobile Number' });
      return;
    }
    setLoading(true);
    setEmployeeData({
      ...employeeData,
      phone: phoneCode && mobileNumber ? phoneCode + mobileNumber : '',
    });

    const selectedApiFunc =
      type === 'edit' ? updateEmployee : createEmployeeApi;

    const employeeDataClone = { ...employeeData };
    delete employeeDataClone['phoneCode'];
    delete employeeDataClone['phone'];

    selectedApiFunc({
      ...employeeDataClone,
      mobileNumber: phoneCode + mobileNumber,
      adminId: user.user.adminId,
    })
      .then((res) => {
        if (btnType === 'Save-And-Send') {
          if (!handleSend(phoneCode + mobileNumber)) {
            setTimeout(() => setLoading(false), 500);
            return;
          }
        }

        type === 'edit'
          ? updateEmployeeInContext(employeeDispatch, {
              employeeData: res,
              selectedEmployeeIndex,
            })
          : addEmployee(employeeDispatch, {
              employeeData: res,
            });

        setEmployeeData(initEmployeeData);
        setLoading(false);
        setError({});
        btnType !== 'Continue' && btnType !== 'Save-And-Send' && handleClose();
      })
      .catch((err) => {
        setLoading(false);
        setError({ ...err });
      });
  };
  return (
    <React.Fragment>
      <Dialog
        open={openModal}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        maxWidth={'sm'}
        fullWidth={true}
        scroll={'paper'}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>{'Add Employee'}</DialogTitle>
        {loading ? (
          <DialogContent className="Chat-Box-Styled-Scroll">
            <LoadingWrapper>
              <CircularProgress color="primary" />
            </LoadingWrapper>
          </DialogContent>
        ) : (
          <>
            <DialogContent className="Chat-Box-Styled-Scroll">
              <Grid container id="scroll-dialog-description">
                {errorRow('', error, ['email', 'mobileNumber'])}
                {FieldNameRow('Name')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={employeeData.firstName}
                    placeholder="First Name(Required)"
                    error={clientSideError.firstName ? true : false}
                    helperText={
                      clientSideError.firstName
                        ? clientSideError.firstName.message
                        : ''
                    }
                    onBlur={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        firstName: e.target.value,
                      })
                    }
                    onChange={(e) => {
                      if (e.target.value && clientSideError.firstName) {
                        const temp = delete clientSideError['firstName'];
                        setClientSideError(temp);
                      }
                    }}
                  />
                </Grid>
                {emptySpacingRow()}
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <TextField
                    defaultValue={employeeData.lastName}
                    placeholder="Last Name"
                    onBlur={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        lastName: e.target.value,
                      })
                    }
                  />
                </Grid>

                {emptySpacingRow()}

                {FieldNameRow('Add Email')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={employeeData.email}
                    placeholder="Email"
                    type="email"
                    error={
                      employeeData.email
                        ? !isEmailValid(employeeData.email)
                        : clientSideError.email
                        ? true
                        : false
                    }
                    helperText={
                      employeeData.email
                        ? isEmailValid(employeeData.email)
                          ? ''
                          : 'Invalid Email'
                        : clientSideError.email
                        ? clientSideError.email.message
                        : ''
                    }
                    onBlur={(e) =>
                      !employeeData.email &&
                      setEmployeeData({
                        ...employeeData,
                        email: e.target.value,
                      })
                    }
                    onKeyUp={(e) => {
                      employeeData.email &&
                        setEmployeeData({
                          ...employeeData,
                          email: e.target.value,
                        });
                      if (e.target.value && clientSideError.email) {
                        const temp = delete clientSideError['email'];
                        setClientSideError(temp);
                      }
                    }}
                  />
                </Grid>
                {errorRow('email', error, ['email', 'mobileNumber'])}

                {emptySpacingRow()}
                {FieldNameRow('Designation')}
                <Grid item xs={9}>
                  <Designation
                    options={designationState}
                    value={employeeData.designation}
                    onBlur={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        designation: e.target.value,
                      })
                    }
                    placeholder={'MERN Developer, ROR Developer'}
                  />
                </Grid>

                {emptySpacingRow()}
                {FieldNameRow('Add Phone')}
                <Grid item xs={9}>
                  <PhoneNumber
                    personInfo={employeeData}
                    setPersonInfo={setEmployeeData}
                  />
                </Grid>
                {errorRow('mobileNumber', error, ['email', 'mobileNumber'])}
                {emptySpacingRow()}

                {FieldNameRow('Joining Date')}
                <Grid item xs={9}>
                  <DateField data={employeeData} setData={setEmployeeData} />
                </Grid>
                {errorRow('joiningDate', error, ['email', 'mobileNumber'])}
                {emptySpacingRow()}

                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <SendMsgWrapper>
                    <Box>
                      <Checkbox checked={true} />
                      WhatsApp
                    </Box>
                    <TemplateMultiSelect
                      setSelectedTemplate={setSelectedTemplate}
                      selectedTemplate={selectedTemplate}
                    />
                  </SendMsgWrapper>
                </Grid>
                {emptySpacingRow()}
              </Grid>
            </DialogContent>
            <DialogActions style={{ paddingRight: 24 }}>
              <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
              <Button
                onClick={() => {
                  handleSubmit('Add');
                }}
              >
                {type === 'edit' ? 'Save' : 'Add'}
              </Button>
              {type !== 'edit' && (
                <Button
                  onClick={() => {
                    handleSubmit('Continue');
                  }}
                >
                  Continue Adding
                </Button>
              )}
              <Button
                onClick={() => {
                  handleSubmit('Save-And-Send');
                }}
              >
                Save And Send Msg
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      <InfoAlert
        open={openInfoAlert}
        setOpen={setOpenInfoAlert}
        title={'WhatsApp'}
        message={alertMessage}
      />
    </React.Fragment>
  );
}

CreateEmployee.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  type: PropTypes.string,
  editingEmployee: PropTypes.object,
  selectedEmployeeIndex: PropTypes.number,
};
export default CreateEmployee;
