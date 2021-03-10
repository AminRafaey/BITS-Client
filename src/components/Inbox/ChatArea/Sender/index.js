import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Typography } from '@material-ui/core';
import { HighlightColor, HoverColor } from '../../../constants/theme';
import { calculateTimeInFormat } from '../../utility';

const MessageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

const ChatTopWrapper = styled(Box)({
  width: '40%',
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '20px',
});

const MessageBoxWrapper = styled(Box)({
  padding: '6px 6px 2px 10px',
  borderRadius: '6px 0px 6px 6px',
  background: HoverColor,
  fontSize: 14,
  position: 'relative',
});

const DateTyp = styled(Typography)({
  float: 'right',
  color: HighlightColor,
  fontSize: 11,
  marginTop: 2,

  paddingLeft: 25,
});

const MessageTyp = styled(Typography)({
  fontSize: 14,
  display: 'inline',
});

function Sender(props) {
  const { message } = props;
  return (
    <MessageWrapper>
      <ChatTopWrapper>
        <MessageBoxWrapper className="S_tri-right S_left-top">
          <MessageTyp>{message.message.conversation}</MessageTyp>
          <DateTyp>{calculateTimeInFormat(message.messageTimestamp)}</DateTyp>
        </MessageBoxWrapper>
      </ChatTopWrapper>
    </MessageWrapper>
  );
}

Sender.propTypes = {
  message: PropTypes.object.isRequired,
};
export default Sender;
