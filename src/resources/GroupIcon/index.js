import React, { useState } from 'react';
import { default as GI } from './icon.svg';
import PropTypes from 'prop-types';
import { HighlightColor } from '../../components/constants/theme';
import { styled, Box } from '@material-ui/core';
const IconWrapper = styled(Box)({
  cursor: 'pointer',
});

function GroupIcon(props) {
  const [color, setColor] = useState(props.color);
  return (
    <IconWrapper>
      {' '}
      <GI
        color={color}
        onMouseOver={() => setColor(HighlightColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
GroupIcon.defaultProps = {
  color: '#CCCCCC',
};

GroupIcon.propTypes = {
  color: PropTypes.string,
};

export default GroupIcon;
