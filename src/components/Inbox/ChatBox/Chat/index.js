import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '../../../HOC';
import { calculateTimeInFormat } from '../../utility';
import { useChatDispatch, markAsUnread } from '../../../../Context/Chat';
import { styled, Box, Typography } from '@material-ui/core';
import {
  LightTextColor,
  BackgroundColor,
  HoverColor,
  HomeIconDefaultColor,
  primaryColor,
} from '../../../constants/theme';
const ChatWrapper = styled(Box)({
  height: 60,
  background: BackgroundColor,
  display: 'flex',
  cursor: 'pointer',
  borderBottom: `1px ${HomeIconDefaultColor} solid`,
  '&:hover': {
    background: HoverColor,
  },
  '&:active': {
    background: primaryColor,
  },
});
const NameTyp = styled(Typography)({
  fontSize: 14,
  fontWeight: 500,
});
const LastMessageTyp = styled(Typography)({
  fontSize: 13,
  color: LightTextColor,
  fontWeight: 100,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

const DateTyp = styled(Typography)({
  fontSize: 12,
  color: LightTextColor,
  fontWeight: 100,
});
const NameWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const LeftWrapper = styled(Box)({
  width: '10%',
  height: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  paddingBottom: 5,
});
const RightWrapper = styled(Box)({
  width: '5%',
  height: '100%',
});
const ContentWrapper = styled(Box)({
  width: '85%',
  height: '100%',
  paddingLeft: 4,
});

function Chat(props) {
  const { jid, name, date, message, unreadCount, setCurrentChatJid } = props;
  const chatDispatch = useChatDispatch();

  return (
    <ChatWrapper
      onClick={() => {
        setCurrentChatJid(jid);
        unreadCount > 0 && markAsUnread(chatDispatch, { jid: jid });
      }}
    >
      <LeftWrapper>
        <Badge badgeContent={unreadCount} color="primary" />
      </LeftWrapper>
      <ContentWrapper>
        <NameWrapper>
          <NameTyp>{name}</NameTyp>
          <DateTyp>{calculateTimeInFormat(date)}</DateTyp>
        </NameWrapper>
        <LastMessageTyp>{"+"+jid.split('@')[0]}</LastMessageTyp>
      </ContentWrapper>
      <RightWrapper></RightWrapper>
    </ChatWrapper>
  );
}

Chat.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  unreadCount: PropTypes.number.isRequired,
  jid: PropTypes.string.isRequired,
  setCurrentChatJid: PropTypes.func.isRequired,
};
export default Chat;
