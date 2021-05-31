import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import phone from 'phone';

import TemplateMultiSelect from '../../../QuickSend/TemplateMultiSelect';
import PhoneNumber from '../../PhoneNumber';
import { Designation, InfoAlert } from '../../../Assets';
import {
  Button,
  TextField,
  SecondaryButton,
  Alert,
  Checkbox,
} from '../../../HOC';
import { Transition } from '../../../ConnectionModal/Modal';
import { validatePassword } from '../index';
import { isEmailValid } from '../../Lead';
import {
  useEmployeeDispatch,
  addEmployee,
  updateEmployee as updateEmployeeInContext,
} from '../../../../Context/Employee';
import { designations } from '../../../../Static/Designation';
import { useConnectStatusState } from '../../../../Context/ConnectStatus';
import { useSocketState } from '../../../../Context/Socket';
import {
  createEmployee as createEmployeeApi,
  updateEmployee,
} from '../../../../api/Employee';
import { sendTextMesage } from '../../../../api/send';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  styled,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import { initEmployeeData } from '../../../constants/InitialValues';
import { toastActions } from '../../../Toast';

const FieldWrapper = styled(Box)({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const FieldLabelNameTyp = styled(Typography)({
  fontSize: 14,
  paddingRight: 32,
});

const LoadingWrapper = styled(Box)({
  minHeight: window.innerHeight - 150,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const MediaErorWrapper = styled(Box)({
  paddingTop: 10,
  fontSize: 14,
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
    source,
    setSelectedEmployee,
  } = props;
  const employeeDispatch = useEmployeeDispatch();
  const connectStatusState = useConnectStatusState();
  const socket = useSocketState();
  const [employeeData, setEmployeeData] = useState(initEmployeeData);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (type === 'edit' || type === 'createWithProvidedInfo') {
      setEmployeeData({ ...editingEmployee });
    } else if (window.localStorage.getItem('employeeData')) {
      setLeadData(JSON.parse(window.localStorage.getItem('employeeData')));
      localStorage.removeItem('employeeData');
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
    //   if (!connectStatusState) {
    //     setAlertMessage(
    //       'Disconnected from WhatsApp, please connect again to continue...'
    //     );
    //     setOpenInfoAlert(true);
    //     return;
    //   }
    //   if (!selectedTemplate.content) {
    //     toastActions.warning('Please Select template to send WhatsApp');
    //     return;
    //   }
    //   if (!mobileNumber) {
    //     toastActions.warning(
    //       'Please Select valid mobile number to send WhatsApp'
    //     );
    //     return;
    //   }
    //   sendTextMesage([mobileNumber], selectedTemplate.content, socket);
    return true;
  };

  const handleSubmit = (btnType) => {
    const phoneCode = employeeData.phoneCode;
    const mobileNumber = employeeData.phone;
    if (!employeeData.firstName) {
      setNameError(true);
      return;
    } else if (!isEmailValid(employeeData.email)) {
      return;
    } else if (!validatePassword(employeeData.password)) {
      return;
    } else if (phone(phoneCode + mobileNumber).length === 0) {
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

    selectedApiFunc({
      ...employeeDataClone,
      phone: phoneCode && mobileNumber ? phoneCode + mobileNumber : '',
    })
      .then((res) => {
        console.log(res);
        if (btnType === 'Save-And-Send') {
          if (
            !handleSend(
              phoneCode && mobileNumber ? phoneCode + mobileNumber : ''
            )
          ) {
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
        setSelectedEmployee && setSelectedEmployee(res);
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
  const emptySpacingRow = () => {
    return (
      <Grid item xs={12}>
        <Box pt={1.5} pb={1.5} />
      </Grid>
    );
  };
  const errorRow = (name) => {
    return (
      <React.Fragment>
        {error.name &&
          (error.name === name ||
            (name === '' &&
              !['email', 'phone', 'website'].includes(error.name))) && (
            <React.Fragment>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <MediaErorWrapper pb={name === '' ? 1.5 : 0}>
                  <Alert severity="error">{error.message}</Alert>
                </MediaErorWrapper>
              </Grid>
            </React.Fragment>
          )}
      </React.Fragment>
    );
  };

  const FieldNameRow = (name) => {
    return (
      <Grid item xs={3}>
        <FieldWrapper>
          <FieldLabelNameTyp>{name}</FieldLabelNameTyp>
        </FieldWrapper>
      </Grid>
    );
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
        <DialogTitle>{'New Contact'}</DialogTitle>
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
                {errorRow('')}
                {FieldNameRow('Name')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={employeeData.firstName}
                    placeholder="First Name(Required)"
                    error={nameError}
                    helperText={nameError ? 'This field is required.' : ''}
                    onBlur={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        firstName: e.target.value,
                      })
                    }
                    onChange={(e) => {
                      if (nameError) {
                        setEmployeeData({
                          ...employeeData,
                          firstName: e.target.value,
                        });
                        e.target.value && setNameError(false);
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

                {FieldNameRow('User Name')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={employeeData.userName}
                    placeholder="User Name(Required)"
                    error={nameError}
                    helperText={nameError ? 'This field is required.' : ''}
                    onBlur={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        userName: e.target.value,
                      })
                    }
                    onChange={(e) => {
                      if (nameError) {
                        setEmployeeData({
                          ...employeeData,
                          userName: e.target.value,
                        });
                        e.target.value && setNameError(false);
                      }
                    }}
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
                        : false
                    }
                    helperText={
                      employeeData.email
                        ? isEmailValid(employeeData.email)
                          ? ''
                          : 'Invalid Email'
                        : ''
                    }
                    onBlur={(e) =>
                      !employeeData.email &&
                      setEmployeeData({
                        ...employeeData,
                        email: e.target.value,
                      })
                    }
                    onKeyUp={(e) =>
                      employeeData.email &&
                      setEmployeeData({
                        ...employeeData,
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>
                {errorRow('email')}

                {emptySpacingRow()}

                {FieldNameRow('Password')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={employeeData.password}
                    placeholder="Password"
                    type="password"
                    error={
                      employeeData.password
                        ? !validatePassword(employeeData.password)
                        : false
                    }
                    helperText={
                      employeeData.password
                        ? validatePassword(employeeData.password)
                          ? ''
                          : 'Invalid Password'
                        : ''
                    }
                    onBlur={(e) =>
                      !employeeData.password &&
                      setEmployeeData({
                        ...employeeData,
                        password: e.target.value,
                      })
                    }
                    onKeyUp={(e) =>
                      employeeData.password &&
                      setEmployeeData({
                        ...employeeData,
                        password: e.target.value,
                      })
                    }
                  />
                </Grid>
                {errorRow('password')}

                {emptySpacingRow()}
                {FieldNameRow('Designation')}
                <Grid item xs={9}>
                  <Designation
                    options={designations}
                    value={employeeData.designation}
                    onBlur={(e) =>
                      setEmployeeData({
                        ...employeeData,
                        designation: e.target.value,
                      })
                    }
                    placeholder={'Facebook, WhatsApp'}
                  />
                </Grid>

                {emptySpacingRow()}
                {FieldNameRow('Add Phone')}
                <Grid item xs={9}>
                  <PhoneNumber
                    personInfo={employeeData}
                    setPersonInfo={setEmployeeData}
                    source={source}
                  />
                </Grid>
                {errorRow('phone')}
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
              {type !== 'edit' && type !== 'createWithProvidedInfo' && (
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
  editingLead: PropTypes.object,
  selectedLeadIndex: PropTypes.number,
  source: PropTypes.string,
  setSelectedLead: PropTypes.func,
};
export default CreateEmployee;
