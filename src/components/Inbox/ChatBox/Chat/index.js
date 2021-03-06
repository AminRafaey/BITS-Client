import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from '../../../HOC';
import { calculateTimeInFormat } from '../../utility';
import { styled, Box, Typography } from '@material-ui/core';
import {
  LightTextColor,
  BackgroundColor,
  HoverColor,
  HomeIconDefaultColor,
} from '../../../constants/theme';
const ChatWrapper = styled(Box)({
  height: 62,
  background: BackgroundColor,
  display: 'flex',
  cursor: 'pointer',
  borderBottom: `1px ${HomeIconDefaultColor} solid`,
  '&:hover': {
    background: HoverColor,
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
  alignItems: 'center',
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
  const { name, date, message, unreadCount } = props;

  return (
    <ChatWrapper className="chat-Wrapper">
      <LeftWrapper>
        <Badge badgeContent={unreadCount} color="primary" />
      </LeftWrapper>
      <ContentWrapper>
        <NameWrapper>
          <NameTyp className="chat">{name}</NameTyp>
          <DateTyp className="chat">{calculateTimeInFormat(date)}</DateTyp>
        </NameWrapper>
        <LastMessageTyp className="chat">{message}</LastMessageTyp>
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
};
export default Chat;
