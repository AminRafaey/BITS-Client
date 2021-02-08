import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Typography } from '@material-ui/core';
import {
  HomeIconDefaultColor,
  LightTextColor,
  GrayColor,
} from '../../../constants/theme';

const MessageWrapper = styled(Box)({
  width: '40%',
});

const ChatTopWrapper = styled(Box)({
  display: 'flex',
  padding: '20px',
});

const MessageBoxWrapper = styled(Box)({
  padding: '6px 10px',
  borderRadius: '0px 6px 6px 6px',
  background: GrayColor,
  fontSize: 12,
  position: 'relative',
});

const DateTyp = styled(Typography)({
  float: 'right',
  color: LightTextColor,
  fontSize: 10,
  marginTop: 2,
  paddingRight: '10px',
});

function Reciever(props) {
  return (
    <MessageWrapper>
      <ChatTopWrapper>
        <MessageBoxWrapper className="tri-right left-top">
          Hello, how are you my man Hello, how are you my man Hello, how are you
          my man Hello, how are you my man
          <DateTyp>27-09-2021</DateTyp>
        </MessageBoxWrapper>
      </ChatTopWrapper>
    </MessageWrapper>
  );
}

Reciever.propTypes = {};
export default Reciever;
