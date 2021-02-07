import React from 'react';
import PropTypes from 'prop-types';
import { Paper, styled, Box } from '@material-ui/core';
import Chat from './Chat';
import { chats } from '../../../Static/Chats';
import { BackgroundColor } from '../../constants/theme';
import SearchInput from './SearchInput';
const ChatsWrapper = styled(Box)({
  position: 'fixed',
  overflowY: 'scroll',
  top: '0',
  bottom: '0',
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
