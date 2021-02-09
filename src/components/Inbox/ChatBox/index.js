import React from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';
import { chats } from '../../../Static/Chats';
import SearchInput from './SearchInput';
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
  return (
    <ChatsWrapper id="Chat-Box-Styled-Scroll">
      <SearchInputWrapper>
        <SearchInput />
      </SearchInputWrapper>
      <Paper>
        {chats.map((c, index) => (
          <Chat
            key={index}
            name={c.name}
            date={c.date}
            message={c.message}
            unreadCount={c.unreadCount}
          />
        ))}
      </Paper>
    </ChatsWrapper>
  );
}

ChatBox.propTypes = {};
export default ChatBox;
