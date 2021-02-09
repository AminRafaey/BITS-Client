import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { default as GI } from './icon.svg';
import { styled, Box } from '@material-ui/core';
import {
  HomeIconDefaultColor,
  HoverColor,
} from '../../components/constants/theme';
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
        onMouseOver={() => setColor(HoverColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
GroupIcon.defaultProps = {
  color: HomeIconDefaultColor,
};

GroupIcon.propTypes = {
  color: PropTypes.string,
};

export default GroupIcon;
