import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import phone from 'phone';
import LabelMultiSelect from '../../BulkLabelOp/index';
import CountrySelect from '../../CountrySelect';
import TemplateMultiSelect from '../../../QuickSend/TemplateMultiSelect';
import PhoneNumber from '../../PhoneNumber';
import { CompanySelect, LeadSource, InfoAlert } from '../../../Assets';
import { Button, TextField, SecondaryButton, Checkbox } from '../../../HOC';
import { Transition } from '../../../ConnectionModal/Modal';
import { isUrlValid, isEmailValid } from '../index';
import {
  useLeadsDispatch,
  addLead,
  updateLead as updateLeadInContext,
} from '../../../../Context/Lead';
import { useCompanyState } from '../../../../Context/Company';
import { useLeadSourceState } from '../../../../Context/LeadSource';
import { useConnectStatusState } from '../../../../Context/ConnectStatus';
import { useSocketState } from '../../../../Context/Socket';
import { createLead, updateLead } from '../../../../api/Lead';
import { sendTextMesage } from '../../../../api/send';
import { emptySpacingRow, FieldNameRow, errorRow } from '../index';
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
import { initLeadData } from '../../../constants/InitialValues';
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
function CreateLead(props) {
  const {
    openModal,
    setOpenModal,
    type,
    editingLead,
    selectedLeadIndex,
    source,
    setSelectedLead,
  } = props;
  const leadsDispatch = useLeadsDispatch();
  const companyState = useCompanyState();
  const connectStatusState = useConnectStatusState();
  const leadSourceState = useLeadSourceState();
  const socket = useSocketState();
  const [leadData, setLeadData] = useState(initLeadData);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (type === 'edit' || type === 'createWithProvidedInfo') {
      setLeadData({ ...editingLead });
    } else if (window.localStorage.getItem('leadData')) {
      setLeadData(JSON.parse(window.localStorage.getItem('leadData')));
      localStorage.removeItem('leadData');
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

  const handleSubmit = (btnType) => {
    const phoneCode = leadData.phoneCode;
    const mobileNumber = leadData.phone;
    if (!leadData.firstName) {
      setNameError(true);
      return;
    } else if (leadData.email && !isEmailValid(leadData.email)) {
      return;
    } else if (leadData.website && !isUrlValid(leadData.website)) {
      return;
    } else if (
      phoneCode &&
      mobileNumber &&
      phone(phoneCode + mobileNumber).length === 0
    ) {
      return;
    }
    setLoading(true);
    setLeadData({
      ...leadData,
      labels: [...leadData.labels.map((l) => l._id)],
      phone: phoneCode && mobileNumber ? phoneCode + mobileNumber : '',
    });

    const selectedApiFunc = type === 'edit' ? updateLead : createLead;

    const leadDataClone = { ...leadData };
    delete leadDataClone['phoneCode'];

    selectedApiFunc({
      ...leadDataClone,
      labels: [...leadDataClone.labels.map((l) => l._id)],
      phone: phoneCode && mobileNumber ? phoneCode + mobileNumber : '',
    })
      .then((res) => {
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
          ? updateLeadInContext(leadsDispatch, {
              leadData: res,
              selectedLeadIndex,
            })
          : addLead(leadsDispatch, {
              leadData: res,
            });
        setSelectedLead && setSelectedLead(res);
        setLeadData(initLeadData);
        setLoading(false);
        setError({});
        btnType !== 'Continue' && btnType !== 'Save-And-Send' && handleClose();
      })
      .catch((err) => {
        setLoading(false);
        err && setError({ ...err });
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
                {errorRow('', error, ['email', 'phone', 'website'])}
                {FieldNameRow('Name')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={leadData.firstName}
                    placeholder="First Name(Required)"
                    error={nameError}
                    helperText={nameError ? 'This field is required.' : ''}
                    onBlur={(e) =>
                      setLeadData({ ...leadData, firstName: e.target.value })
                    }
                    onChange={(e) => {
                      if (nameError) {
                        setLeadData({ ...leadData, firstName: e.target.value });
                        e.target.value && setNameError(false);
                      }
                    }}
                  />
                </Grid>
                {emptySpacingRow()}
                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <TextField
                    defaultValue={leadData.lastName}
                    placeholder="Last Name"
                    onBlur={(e) =>
                      setLeadData({ ...leadData, lastName: e.target.value })
                    }
                  />
                </Grid>
                {emptySpacingRow()}
                {FieldNameRow('Lead Source')}
                <Grid item xs={9}>
                  <LeadSource
                    options={leadSourceState}
                    value={leadData.leadSource}
                    onBlur={(e) =>
                      setLeadData({ ...leadData, leadSource: e.target.value })
                    }
                    placeholder={'Facebook, WhatsApp'}
                  />
                </Grid>
                {emptySpacingRow()}
                {FieldNameRow('Company')}
                <Grid item xs={9}>
                  <CompanySelect
                    options={companyState}
                    value={leadData.companyName}
                    onBlur={(e) =>
                      setLeadData({ ...leadData, companyName: e.target.value })
                    }
                    placeholder={'Company name'}
                  />
                </Grid>
                {emptySpacingRow()}

                {FieldNameRow('Tags')}
                <Grid item xs={9}>
                  <LabelMultiSelect
                    type={type}
                    personInfo={leadData}
                    setPersonInfo={setLeadData}
                  />
                </Grid>
                {emptySpacingRow()}

                {FieldNameRow('Add Email')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={leadData.email}
                    placeholder="Email"
                    type="email"
                    error={
                      leadData.email ? !isEmailValid(leadData.email) : false
                    }
                    helperText={
                      leadData.email
                        ? isEmailValid(leadData.email)
                          ? ''
                          : 'Invalid Email'
                        : ''
                    }
                    onBlur={(e) =>
                      !leadData.email &&
                      setLeadData({ ...leadData, email: e.target.value })
                    }
                    onKeyUp={(e) =>
                      leadData.email &&
                      setLeadData({ ...leadData, email: e.target.value })
                    }
                  />
                </Grid>
                {errorRow('email', error, ['email', 'phone', 'website'])}
                {emptySpacingRow()}
                {FieldNameRow('Add Phone')}
                <Grid item xs={9}>
                  <PhoneNumber
                    personInfo={leadData}
                    setPersonInfo={setLeadData}
                    source={source}
                  />
                </Grid>
                {errorRow('phone', error, ['email', 'phone', 'website'])}
                {emptySpacingRow()}

                {FieldNameRow('Website')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={leadData.website}
                    placeholder="https://example.com"
                    error={
                      leadData.website ? !isUrlValid(leadData.website) : false
                    }
                    helperText={
                      leadData.website
                        ? isUrlValid(leadData.website)
                          ? ''
                          : 'Invalid Url'
                        : ''
                    }
                    onBlur={(e) =>
                      setLeadData({ ...leadData, website: e.target.value })
                    }
                    onKeyUp={(e) =>
                      leadData.website &&
                      setLeadData({ ...leadData, website: e.target.value })
                    }
                  />
                </Grid>
                {errorRow('website', error, ['email', 'phone', 'website'])}
                {emptySpacingRow()}

                {FieldNameRow('Address')}
                <Grid item xs={9}>
                  <TextField
                    defaultValue={leadData.address}
                    placeholder="Address"
                    onBlur={(e) =>
                      setLeadData({ ...leadData, address: e.target.value })
                    }
                  />
                </Grid>
                {emptySpacingRow()}

                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <TextField
                    defaultValue={leadData.city}
                    placeholder="City"
                    onBlur={(e) =>
                      setLeadData({ ...leadData, city: e.target.value })
                    }
                  />
                </Grid>
                {emptySpacingRow()}

                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <TextField
                    defaultValue={leadData.state}
                    placeholder="State"
                    onBlur={(e) =>
                      setLeadData({ ...leadData, state: e.target.value })
                    }
                  />
                </Grid>
                {emptySpacingRow()}

                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <TextField
                    defaultValue={leadData.zip}
                    placeholder="Zip"
                    onBlur={(e) =>
                      setLeadData({ ...leadData, zip: e.target.value })
                    }
                  />
                </Grid>
                {emptySpacingRow()}

                <Grid item xs={3}></Grid>
                <Grid item xs={9}>
                  <CountrySelect
                    personInfo={leadData}
                    setPersonInfo={setLeadData}
                  />
                </Grid>
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

CreateLead.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  type: PropTypes.string,
  editingLead: PropTypes.object,
  selectedLeadIndex: PropTypes.number,
  source: PropTypes.string,
  setSelectedLead: PropTypes.func,
};
export default CreateLead;
