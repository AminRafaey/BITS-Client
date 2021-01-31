import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { default as LI } from './icon.svg';
import { styled, Box } from '@material-ui/core';
import {
  HighlightColor,
  HomeIconDefaultColor,
} from '../../components/constants/theme';
const IconWrapper = styled(Box)({
  cursor: 'pointer',
});

function LogIcon(props) {
  const [color, setColor] = useState(props.color);
  return (
    <IconWrapper>
      {' '}
      <LI
        color={color}
        onMouseOver={() => setColor(HighlightColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
LogIcon.defaultProps = {
  color: HomeIconDefaultColor,
};

LogIcon.propTypes = {
  color: PropTypes.string,
};

export default LogIcon;
