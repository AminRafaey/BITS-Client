import React, { useState } from 'react';
import { HoverColor } from '../../constants/theme';
import { styled, Typography, Box, Grid } from '@material-ui/core';

const TextAreaWrapper = styled(Box)({});
const SendWrapper = styled(Box)({
  marginLeft: '49px',
  marginTop: '5px',
  width: 'fit-content',
  background: '#ffff',
  borderRadius: 5,
  cursor: 'pointer',
  '&:hover': {
    background: HoverColor,
  },
});
const ScheduleWrapper = styled(Box)({
  marginLeft: '49px',
  marginTop: '5px',
  width: 'fit-content',
  background: '#ffff',
  borderRadius: 5,
  cursor: 'pointer',
  '&:hover': {
    background: HoverColor,
  },
});
const SendTyp = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: 14,
  padding: '0px 20px 0px 20px',
});
const ScheduleTyp = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: 14,
  padding: '0px 20px 0px 20px',
});

const FormatTyp = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: 14,
});

const ButtonWrapper = styled(Box)({
  display: 'flex',
  paddingTop: 20,
});
export default function ListOption() {
  const [textAreaVal, setTextAreaVal] = useState('');

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={7}>
          <TextAreaWrapper>
            <textarea
              style={{
                width: '100%',
                minHeight: '160px',
                resize: 'none',
                borderRadius: '42px',
                border: `0px solid #ffff`,
                padding: '1.5rem',
                outlineWidth: '0px',
              }}
              value={textAreaVal}
              id="templateTextArea"
              placeholder="Valid Format 923348035644,923174343123"
              onChange={(e) => {
                setTextAreaVal(e.target.value);
              }}
            />
          </TextAreaWrapper>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <FormatTyp>{'Valid Format 923348035644,923174343123'}</FormatTyp>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <ButtonWrapper>
            <SendWrapper>
              <SendTyp> {'Send'}</SendTyp>
            </SendWrapper>
            <ScheduleWrapper>
              <ScheduleTyp> {'Schedule'}</ScheduleTyp>
            </ScheduleWrapper>
          </ButtonWrapper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
