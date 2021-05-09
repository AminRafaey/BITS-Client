import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../HOC';
import { useSocketState } from '../../../Context/Socket';
import { useConnectStatusState } from '../../../Context/ConnectStatus';
import { sendTextMesage, sendMedia } from '../../../api/send';
import { styled, Typography, Box, Grid } from '@material-ui/core';
import { toastActions } from '../../Toast';
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
  const socket = useSocketState();
  const connectStatusState = useConnectStatusState();

  const handleSend = () => {
    if (!connectStatusState) {
      setAlertMessage(
        'Disconnected from WhatsApp, please connect again to continue...'
      );
      return;
    }
    if (contantList.length === 0) {
      toastActions.warning(
        'Type or select one or more valid contacts to continue ...'
      );
      return;
    }
    if (selectedMedia.file === undefined) {
      if (!message) {
        toastActions.warning('Type message to continue ...');
        return;
      }
      sendTextMesage(contantList, message, socket);
    } else if (selectedMedia.file) {
      const formData = new FormData();
      formData.append('mobileNumbers', JSON.stringify(contantList));
      formData.append('message', message);
      formData.append('file', selectedMedia.file);
      formData.append('mediaType', selectedMedia.type);
      sendMedia(formData, socket);
    }
  };
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
              <Button onClick={() => handleSend()}> {'Send'}</Button>
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
