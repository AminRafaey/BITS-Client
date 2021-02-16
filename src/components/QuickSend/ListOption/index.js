import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../HOC';
import { sendTextMesage } from '../../../api/send';
import { styled, Typography, Box, Grid } from '@material-ui/core';
const textAreaStyle = {
  width: '100%',
  minHeight: '160px',
  resize: 'none',
  borderRadius: '42px',
  border: `0px solid #ffff`,
  padding: '1.5rem',
  outlineWidth: '0px',
};
const TextAreaWrapper = styled(Box)({});
export const SendWrapper = styled(Box)({
  marginLeft: '4px',
  marginTop: '5px',
  width: 'fit-content',
});
export const ScheduleWrapper = styled(Box)({
  marginLeft: '49px',
  marginTop: '5px',
  width: 'fit-content',
});

const FormatTyp = styled(Typography)({
  fontSize: 14,
});

export const ButtonWrapper = styled(Box)({
  display: 'flex',
  paddingTop: 20,
});
export default function ListOption(props) {
  const { setContactList, contantList, selectedMedia, message } = props;

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={7}>
          <TextAreaWrapper>
            <textarea
              style={textAreaStyle}
              placeholder="Valid Format 923364773099,923174343123"
              onBlur={(e) => {
                setContactList(
                  e.target.value
                    .split(',')
                    .filter((n) => n.match(/^(92)\d{10}$/))
                );
              }}
            />
          </TextAreaWrapper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <FormatTyp>{'Valid Format 923364773099,923174343123'}</FormatTyp>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <ButtonWrapper>
            <SendWrapper>
              <Button onClick={() => sendTextMesage(contantList, message)}>
                {' '}
                {'Send'}
              </Button>
            </SendWrapper>
            <ScheduleWrapper>
              <Button> {'Schedule'}</Button>
            </ScheduleWrapper>
          </ButtonWrapper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

ListOption.propTypes = {
  setContactList: PropTypes.func.isRequired,
  contantList: PropTypes.array.isRequired,
  selectedMedia: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
};
