import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Reciever from './Reciever';
import Sender from './Sender';
import TypingArea from './TypingArea';
import { styled, Box } from '@material-ui/core';

const ChatAreaWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  background: '#ffff',
});

const TypingAreaWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  height: '30vh',
  background: '#ffff',
});
const ChatsWrapper = styled(Box)({
  overflowY: 'scroll',
  padding: '0px 5px 0px 5px',
  maxHeight: '70vh',
});

function ChatArea(props) {
  return (
    <ChatAreaWrapper>
      <ChatsWrapper id="Chat-Box-Styled-Scroll">
        <Reciever />
        <Reciever />
        <Sender />
        <Reciever />
        <Reciever />
        <Sender />
        <Reciever />
        <Reciever />
        <Sender />
        <Reciever />
        <Reciever />
        <Sender />
      </ChatsWrapper>
      <TypingAreaWrapper>
        <TypingArea />
      </TypingAreaWrapper>
    </ChatAreaWrapper>
  );
}

ChatArea.propTypes = {};
export default ChatArea;
