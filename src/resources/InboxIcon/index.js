import React, { useState } from 'react';
import { default as II } from './icon.svg';
import PropTypes from 'prop-types';
import { HighlightColor } from '../../components/constants/theme';
import { styled, Box } from '@material-ui/core';
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
  color: '#CCCCCC',
};

InboxIcon.propTypes = {
  color: PropTypes.string,
};

export default InboxIcon;
