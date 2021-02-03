import React from 'react';
import PropTypes from 'prop-types';
import inbox from '../../../public/images/inbox.png';
import Reciever from './Reciever';
import Sender from './Sender';
import { styled, Box, Paper, Grid } from '@material-ui/core';
function ChatArea(props) {
  const ChatAreaWrapper = styled(Box)({
    overflowY: 'scroll',
    top: '0',
    bottom: '0',
  });
  return (
    <ChatAreaWrapper className="scrollElement">
      <React.Fragment>
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
      </React.Fragment>
    </ChatAreaWrapper>
  );
}

ChatArea.propTypes = {};
export default ChatArea;
