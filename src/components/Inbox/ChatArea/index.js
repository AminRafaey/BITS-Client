import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Reciever from './Reciever';
import Sender from './Sender';
import TypingArea from './TypingArea';
import { styled, Box } from '@material-ui/core';

const ChatAreaWrapper = styled(Box)({
  position: 'fixed',
  top: '0',
  bottom: '0',
  display: 'flex',
  flexDirection: 'column',
});

const TypingAreaWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  height: '30%',
});
const ChatsWrapper = styled(Box)({
  overflowY: 'scroll',
  padding: '0px 15px 0px 33px',
  height: '70%',
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
    <ChatAreaWrapper ref={textAreaRef}>
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
        <TypingArea typingAreaWidth={typingAreaWidth} />
      </TypingAreaWrapper>
    </ChatAreaWrapper>
  );
}

ChatArea.propTypes = {};
export default ChatArea;
