import React from 'react';
import PropTypes from 'prop-types';
import Chat from './Chat';
import SearchInput from './SearchInput';
import { useChatState } from '../../../Context/Chat';
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
  const { setCurrentChatJid } = props;
  const chatState = useChatState();

  const getMessage = (c, index) => {
    if (c['messages'][index]['messageStubType']) {
      return c['messages'][index]['messageStubType'];
    } else if (c['messages'][index]['message']['conversation']) {
      return c['messages'][index]['message']['conversation'];
    } else {
      if (index !== 0) {
        return getMessage(c, index - 1);
      } else {
        return 'Nothing';
      }
    }
  };
  return (
    <ChatsWrapper className="Chat-Box-Styled-Scroll">
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
                message={'Hello, How are you'} //getMessage(c, c['messages'].length - 1)
                unreadCount={c.count}
                setCurrentChatJid={setCurrentChatJid}
                jid={c.jid}
              />
            );
          })}
      </Paper>
    </ChatsWrapper>
  );
}

ChatBox.propTypes = {
  setCurrentChatJid: PropTypes.func.isRequired,
};
export default ChatBox;
