import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Reciever from './Reciever';
import Sender from './Sender';
import TypingArea from './TypingArea';
import {
  useChatState,
  useChatDispatch,
  addMessages,
} from '../../../Context/Chat';
import { useSocketState } from '../../../Context/Socket';
import { styled, Box, CircularProgress } from '@material-ui/core';

const ChatAreaWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  background: '#ffff',
});

const TypingAreaWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  height: '35vh',
  background: '#ffff',
});

const ChatsWrapper = styled(Box)({
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column-reverse',
  padding: '0px 5px 0px 5px',
  height: '65vh',
});

const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function ChatArea(props) {
  const { currentChatJid } = props;
  const socket = useSocketState();
  const chatState = useChatState();
  const chatDispatch = useChatDispatch();
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [message, setMessage] = useState('');
  const [selectedMedia, setSelectedMedia] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const messages = chatState.find((c) => c.jid === currentChatJid).messages;
    if (messages ? messages.length < 1 : true) {
      socket.on('get-contact-messages', (res) => {
        setLoader(false);
        addMessages(chatDispatch, {
          jid: res.jid,
          messages: res.messages.messages,
        });
      });

      socket.emit('get-contact-messages', currentChatJid);
    } else {
      setLoader(false);
    }
  }, [currentChatJid]);

  useEffect(() => {
    Object.entries(selectedTemplate).length > 0 &&
      setMessage(selectedTemplate.content);
  }, [selectedTemplate]);
  if (loader) {
    return (
      <LoadingWrapper>
        <CircularProgress color="primary" />
      </LoadingWrapper>
    );
  }
  return (
    <ChatAreaWrapper>
      <ChatsWrapper id="scrollableDiv" className="Chat-Box-Styled-Scroll">
        {chatState
          .find((c) => c.jid === currentChatJid)
          ['messages'].map((m, index) => {
            if (m.message && m.message.conversation) {
              return m.key.fromMe ? (
                <Sender message={m} key={index} />
              ) : (
                <Reciever message={m} key={index} />
              );
            }
          })}
      </ChatsWrapper>

      <TypingAreaWrapper>
        <TypingArea
          currentChatJid={currentChatJid}
          setSelectedTemplate={setSelectedTemplate}
          message={message}
          setMessage={setMessage}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
        />
      </TypingAreaWrapper>
    </ChatAreaWrapper>
  );
}

ChatArea.propTypes = {
  currentChatJid: PropTypes.string.isRequired,
};
export default ChatArea;
