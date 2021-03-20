import React from 'react';
import PropTypes from 'prop-types';
import LabelMultiSelect from '../../Label/index';
import CountrySelect from '../../CountrySelect';
import PhoneCodeSelect from '../../PhoneCodeSelect';
import { Button, TextField } from '../../../HOC';
import { Transition } from '../../../ConnectionModal/Modal';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Typography,
  styled,
  Grid,
} from '@material-ui/core';

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

function CreateContact() {
  const [openModal, setOpenModal] = React.useState(true);
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
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
    <div>
      <Button onClick={handleClickOpen}>Open form dialog</Button>
      <Dialog
        open={openModal}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        maxWidth={'sm'}
        scroll={'paper'}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent className="Chat-Box-Styled-Scroll">
          <Grid container id="scroll-dialog-description">
            {FieldNameRow('Name')}
            <Grid item xs={9}>
              <TextField placeholder="First Name(Required)" />
            </Grid>
            {emptySpacingRow()}
            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <TextField placeholder="Last Name" />
            </Grid>
            {emptySpacingRow()}
            {FieldNameRow('Title')}
            <Grid item xs={9}>
              <TextField placeholder="Title" />
            </Grid>
            {emptySpacingRow()}
            {FieldNameRow('Company')}
            <Grid item xs={9}>
              <TextField placeholder="Company name" />
            </Grid>
            {emptySpacingRow()}

            {FieldNameRow('Tags')}
            <Grid item xs={9}>
              <LabelMultiSelect />
            </Grid>
            {emptySpacingRow()}

            {FieldNameRow('Add Email')}
            <Grid item xs={9}>
              <TextField placeholder="Email" />
            </Grid>
            {emptySpacingRow()}

            {FieldNameRow('Add Phone')}
            <Grid item xs={9}>
              <PhoneCodeSelect />
            </Grid>
            {emptySpacingRow()}

            {FieldNameRow('Website')}
            <Grid item xs={9}>
              <TextField placeholder="Website" />
            </Grid>
            {emptySpacingRow()}

            {FieldNameRow('Address')}
            <Grid item xs={9}>
              <TextField placeholder="Address" />
            </Grid>
            {emptySpacingRow()}

            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <TextField placeholder="City" />
            </Grid>
            {emptySpacingRow()}

            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <TextField placeholder="State" />
            </Grid>
            {emptySpacingRow()}

            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <TextField placeholder="Zip" />
            </Grid>
            {emptySpacingRow()}

            <Grid item xs={3}></Grid>
            <Grid item xs={9}>
              <CountrySelect />
            </Grid>
            {emptySpacingRow()}
          </Grid>
        </DialogContent>
        <DialogActions style={{ paddingRight: 24 }}>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateContact.propTypes = {};
export default CreateContact;
