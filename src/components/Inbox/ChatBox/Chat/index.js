import React from 'react';
import PropTypes from 'prop-types';
import { styled, Box, Typography } from '@material-ui/core';
import { LightTextColor } from '../../../constants/theme';
import { Badge } from '../../../HOC';

const ChatWrapper = styled(Box)({
  width: 300,
  height: 60,
  background: 'aliceBlue',
  display: 'flex',
});
const NameTyp = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
});
const LastMessageTyp = styled(Typography)({
  fontSize: 13,
  color: LightTextColor,
  fontWeight: 100,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});
const DateWrapper = styled(Typography)({
  fontSize: 13,
  color: LightTextColor,
  fontWeight: 100,
});
const NameWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
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
});
function Chat(props) {
  const { name, date, message, unreadCount } = props;
  return (
    <ChatWrapper>
      <LeftWrapper>
        <Badge badgeContent={unreadCount} color="primary" />
      </LeftWrapper>
      <ContentWrapper>
        <NameWrapper>
          <NameTyp>{name}</NameTyp>
          <DateWrapper>{date}</DateWrapper>
        </NameWrapper>
        <LastMessageTyp>{message}</LastMessageTyp>
      </ContentWrapper>
      <RightWrapper></RightWrapper>
    </ChatWrapper>
  );
}

Chat.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  unreadCount: PropTypes.number.isRequired,
};
export default Chat;
