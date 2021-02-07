import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Reciever from './Reciever';
import Sender from './Sender';
import TypingArea from './TypingArea';
import { styled, Box, Grid } from '@material-ui/core';

const ChatAreaWrapper = styled(Box)({
  position: 'fixed',
  overflowY: 'scroll',
  top: '0',
  bottom: '0',
  padding: '0px 15px 0px 33px',
});

const EmptyWrapper = styled(Box)({
  height: 150,
});

function ChatArea(props) {
  const textAreaRef = createRef();
  const [typingAreaWidth, setTypingAreaWidth] = useState(0);

  useEffect(() => {
    setTypingAreaWidth(
      textAreaRef.current ? textAreaRef.current.clientWidth - 70 : 0
    );
  }, []);
  return (
    <ChatAreaWrapper id="Chat-Box-Styled-Scroll" ref={textAreaRef}>
      <TypingArea typingAreaWidth={typingAreaWidth} />
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
      <EmptyWrapper />
    </ChatAreaWrapper>
  );
}

ChatArea.propTypes = {};
export default ChatArea;
