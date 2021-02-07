import React from 'react';
import { Box, styled, Typography } from '@material-ui/core';
import { HighlightColor, HoverColor } from '../../../constants/theme';

const MessageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

const ChatTopWrapper = styled(Box)({
  width: '40%',
  display: 'flex',
  padding: '20px',
});

const MessageBoxWrapper = styled(Box)({
  padding: '6px 10px',
  borderRadius: '6px 0px 6px 6px',
  background: HoverColor,
  fontSize: 12,
  position: 'relative',
});

const DateTyp = styled(Typography)({
  float: 'right',
  color: HighlightColor,
  fontSize: 10,
  marginTop: 2,
  paddingRight: '10px',
});

function Sender(props) {
  return (
    <MessageWrapper>
      <ChatTopWrapper>
        <MessageBoxWrapper className="S_tri-right S_left-top">
          Hello, how are you my man Hello, how are you my man Hello, how are you
          my man Hello, how are you my man
          <DateTyp>27-09-2021</DateTyp>
        </MessageBoxWrapper>
      </ChatTopWrapper>
    </MessageWrapper>
  );
}

Sender.propTypes = {};
export default Sender;
