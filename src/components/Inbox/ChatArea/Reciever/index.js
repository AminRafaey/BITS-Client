import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled, Typography } from '@material-ui/core';
import { LightTextColor, GrayColor } from '../../../constants/theme';
import { formattedTime } from '../../utility';
import { colors } from '../../../constants/AvatarColor.js';

const MessageWrapper = styled(Box)({
  width: '40%',
});

const ChatTopWrapper = styled(Box)({
  display: 'flex',
  padding: '20px',
});

const MessageBoxWrapper = styled(Box)({
  padding: '6px 6px 2px 10px',
  borderRadius: '0px 6px 6px 6px',
  background: GrayColor,
  fontSize: 14,
  position: 'relative',
});

const DateTyp = styled(Typography)({
  float: 'right',
  color: LightTextColor,
  fontSize: 11,
  marginTop: 2,
  paddingLeft: 25,
});

const MessageTyp = styled(Typography)({
  fontSize: 12,
  display: 'inline',
  wordBreak: 'break-all',
});

const NameTyp = styled(Typography)({
  fontSize: 10,
});
function Reciever(props) {
  const { message, contactType } = props;

  return (
    <MessageWrapper>
      <ChatTopWrapper>
        <MessageBoxWrapper className="tri-right left-top">
          {contactType === 'group' && (
            <NameTyp
              style={{
                color:
                  colors[
                    message.participant.split('@')[0][
                      message.participant.split('@')[0].length - 1
                    ]
                  ],
              }}
            >
              {'+' + message.participant.split('@')[0]}
            </NameTyp>
          )}
          <MessageTyp>{message.message.conversation}</MessageTyp>
          <DateTyp>{formattedTime(message.messageTimestamp)}</DateTyp>
        </MessageBoxWrapper>
      </ChatTopWrapper>
    </MessageWrapper>
  );
}

Reciever.propTypes = {
  message: PropTypes.object.isRequired,
  contactType: PropTypes.string,
};
export default Reciever;
