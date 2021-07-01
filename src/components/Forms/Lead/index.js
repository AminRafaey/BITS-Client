import React from 'react';
import { Alert } from '../../HOC';
import { Box, Typography, styled, Grid } from '@material-ui/core';

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

const MediaErorWrapper = styled(Box)({
  paddingTop: 10,
  fontSize: 14,
});

export const isEmailValid = (email) => {
  if (email) {
    return /\S+@\S+\.\S+/.test(email);
  }
};
export const isUrlValid = (url) => {
  if (url) {
    return /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(
      url
    );
  }
};

export const emptySpacingRow = () => {
  return (
    <Grid item xs={12}>
      <Box pt={1.5} pb={1.5} />
    </Grid>
  );
};

export const FieldNameRow = (name) => {
  return (
    <Grid item xs={3}>
      <FieldWrapper>
        <FieldLabelNameTyp>{name}</FieldLabelNameTyp>
      </FieldWrapper>
    </Grid>
  );
};

export const errorRow = (name, error, arr) => {
  return (
    <React.Fragment>
      {error.name &&
        (error.name === name || (name === '' && !arr.includes(error.name))) && (
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
