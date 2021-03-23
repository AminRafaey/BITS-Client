import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LabelMultiSelect from '../../Label/index';
import CountrySelect from '../../CountrySelect';
import PhoneNumber from '../../PhoneNumber';
import { Button, TextField, SecondaryButton } from '../../../HOC';
import { Transition } from '../../../ConnectionModal/Modal';
import { isUrlValid, isEmailValid } from '../index';
import { useLeadsDispatch, addLead } from '../../../../Context/Lead';
import { createLead } from '../../../../api/Lead';
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

function CreateLead(props) {
  const { openModal, setOpenModal } = props;
  const leadsDispatch = useLeadsDispatch();
  const [leadData, setLeadData] = useState(initLeadData);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('leadData')) {
      setLeadData(JSON.parse(window.localStorage.getItem('leadData')));
      localStorage.removeItem('leadData');
    }
  }, []);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    if (!leadData.firstName) {
      setNameError(true);
      return;
    } else if (leadData.email && !isEmailValid(leadData.email)) {
      return;
    } else if (leadData.website && !isUrlValid(leadData.website)) {
      return;
    }
    setLoading(true);
    createLead(leadData)
      .then((res) => {
        addLead(leadsDispatch, {
          leadData: {
            ...leadData,
            _id: 50,
            labels: [...leadData.labels.map((l) => l._id)],
          },
        });
        setLeadData(initLeadData);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };
  const emptySpacingRow = () => {
    return (
      <Grid item xs={12}>
        <Box pt={1.5} pb={1.5} />
      </Grid>
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
                <TextField
                  defaultValue={leadData.leadSource}
                  placeholder="Facebook, WhatsApp"
                  onBlur={(e) =>
                    setLeadData({ ...leadData, leadSource: e.target.value })
                  }
                />
              </Grid>
              {emptySpacingRow()}
              {FieldNameRow('Company')}
              <Grid item xs={9}>
                <TextField
                  defaultValue={leadData.companyName}
                  placeholder="Company name"
                  onBlur={(e) =>
                    setLeadData({ ...leadData, companyName: e.target.value })
                  }
                />
              </Grid>
              {emptySpacingRow()}

              {FieldNameRow('Tags')}
              <Grid item xs={9}>
                <LabelMultiSelect
                  type={'createLead'}
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
                  error={leadData.email ? !isEmailValid(leadData.email) : false}
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
              {emptySpacingRow()}

              {FieldNameRow('Add Phone')}
              <Grid item xs={9}>
                <PhoneNumber
                  personInfo={leadData}
                  setPersonInfo={setLeadData}
                />
              </Grid>
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
            </Grid>
          </DialogContent>
          <DialogActions style={{ paddingRight: 24 }}>
            <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
            <Button
              onClick={() => {
                handleSubmit();
                handleClose();
              }}
            >
              Add
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Continue Adding
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

CreateLead.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
export default CreateLead;
