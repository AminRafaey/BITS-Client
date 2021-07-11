import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { default as LI } from './icon.svg';
import { styled, Box } from '@material-ui/core';
import {
  HomeIconDefaultColor,
  HoverColor,
} from '../../components/constants/theme';
const IconWrapper = styled(Box)({
  cursor: 'pointer',
});

function LabelIcon(props) {
  const [color, setColor] = useState(props.color);
  return (
    <IconWrapper>
      {' '}
      <LI
        color={color}
        onMouseOver={() => setColor(HoverColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
LabelIcon.defaultProps = {
  color: HomeIconDefaultColor,
};

LabelIcon.propTypes = {
  color: PropTypes.string,
};

export default LabelIcon;
