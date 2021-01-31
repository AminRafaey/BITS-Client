import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { default as II } from './icon.svg';
import { styled, Box } from '@material-ui/core';
import {
  HighlightColor,
  HomeIconDefaultColor,
} from '../../components/constants/theme';
const IconWrapper = styled(Box)({
  cursor: 'pointer',
});

function InboxIcon(props) {
  const [color, setColor] = useState(props.color);
  return (
    <IconWrapper>
      <II
        color={color}
        onMouseOver={() => setColor(HighlightColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
InboxIcon.defaultProps = {
  color: HomeIconDefaultColor,
};

InboxIcon.propTypes = {
  color: PropTypes.string,
};

export default InboxIcon;
