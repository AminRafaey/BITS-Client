import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';
import { chats } from '../../../Static/Chats';
import SearchInput from './SearchInput';
import {
  useChatState,
  useChatDispatch,
  loadChats,
} from '../../../Context/Chat';
import { getChats } from '../../../api/chat';
import { Paper, styled, Box } from '@material-ui/core';

import { BackgroundColor } from '../../constants/theme';

const ChatsWrapper = styled(Box)({
  maxHeight: '100vh',
  overflowY: 'scroll',
});

const SearchInputWrapper = styled(Box)({
  display: 'flex',
  background: BackgroundColor,
  justifyContent: 'center',
});

function ChatBox(props) {
  const chatState = useChatState();
  const chatDispatch = useChatDispatch();
  const loadChatsInContext = (chats) => {
    loadChats(chatDispatch, {
      chats: chats,
    });
  };

  useEffect(() => {
    (async () => {
      getChats(loadChatsInContext);
    })();
  }, []);

  const getMessage = (c, index) => {
    if (c['messages'][index]['messageStubType']) {
      return c['messages'][index]['messageStubType'];
    } else if (c['messages'][index]['message']['conversation']) {
      return c['messages'][index]['message']['conversation'];
    } else {
      if (index !== 0) {
        return getMessage(c, index - 1);
      } else {
        console.log(c);
        return 'Nothing';
      }
    }
  };
  return (
    <ChatsWrapper id="Chat-Box-Styled-Scroll">
      <SearchInputWrapper>
        <SearchInput />
      </SearchInputWrapper>
      <Paper>
        {chatState
          .filter((c) => c.jid.split('@')[1] === 's.whatsapp.net')
          .map((c, index) => {
            return (
              <Chat
                key={index}
                name={c.name ? c.name : c.jid.split('@')[0]}
                date={c.t}
                message={'hey'} //getMessage(c, c['messages'].length - 1)
                unreadCount={0}
              />
            );
          })}
      </Paper>
    </ChatsWrapper>
  );
}

ChatBox.propTypes = {};
export default ChatBox;
