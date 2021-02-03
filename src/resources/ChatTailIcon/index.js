import React from 'react';
import PropTypes from 'prop-types';
import { default as CT } from './icon.svg';
import { styled, Box, Tooltip } from '@material-ui/core';
import { DelieverStatusColor } from '../../components/constants/theme';

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  display: 'inline',
});

function ChatTailIcon(props) {
  const { color, rotate } = props;
  return (
    <CT
      color={color}
      style={{
        ...(rotate
          ? { transform: 'rotate(270deg)', marginTop: -3, marginLeft: 2 }
          : { marginTop: -1 }),
      }}
    />
  );
}

ChatTailIcon.defaultProps = {
  color: DelieverStatusColor,
};

ChatTailIcon.propTypes = {
  color: PropTypes.string,
};

export default ChatTailIcon;
