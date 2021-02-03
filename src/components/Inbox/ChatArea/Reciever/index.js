import React from 'react';
import PropTypes from 'prop-types';
import { Chip, Box, styled, Typography, Avatar } from '@material-ui/core';
import {
  LinkColor,
  HeadingColor,
  HoverColor,
  HomeIconDefaultColor,
  BackgroundColor,
  LightTextColor,
} from '../../../constants/theme';
import { ChatTailIcon } from '../../../../resources';
import AddIcon from '@material-ui/icons/Add';

const MessageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '40%',
});

const ChatTopWrapper = styled(Box)({
  display: 'flex',
  padding: '10px',
});

const MessageBoxWrapper = styled(Box)({
  padding: '6px 10px',
  borderRadius: '0px 6px 6px 6px',
  background: 'rgba(100, 170, 0, .1)',
  fontSize: 12,
});

const DateTyp = styled(Typography)({
  float: 'right',
  color: LightTextColor,
  fontSize: 10,
  marginTop: 2,
  paddingRight: '10px',
});

function Reciever(props) {
  return (
    <MessageWrapper>
      <ChatTopWrapper>
        <ChatTailIcon color={'rgba(100, 170, 0, .1)'} />
        <MessageBoxWrapper>
          Hello, how are you my man Hello, how are you my man Hello, how are you
          my man Hello, how are you my man
          <DateTyp>27-09-2021</DateTyp>
        </MessageBoxWrapper>
      </ChatTopWrapper>
    </MessageWrapper>
  );
}

Reciever.propTypes = {};
export default Reciever;
