import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { default as CI } from './icon.svg';
import { styled, Box } from '@material-ui/core';
import {
  HighlightColor,
  HomeIconDefaultColor,
} from '../../components/constants/theme';

const IconWrapper = styled(Box)({
  cursor: 'pointer',
});

function ChatIcon(props) {
  const [color, setColor] = useState(props.color);
  return (
    <IconWrapper>
      {' '}
      <CI
        color={color}
        onMouseOver={() => setColor(HighlightColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
ChatIcon.defaultProps = {
  color: HomeIconDefaultColor,
};

ChatIcon.propTypes = {
  color: PropTypes.string,
};

export default ChatIcon;
