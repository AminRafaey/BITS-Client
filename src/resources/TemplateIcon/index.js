import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { default as TI } from './icon.svg';

import { styled, Box } from '@material-ui/core';
import {
  HighlightColor,
  HomeIconDefaultColor,
} from '../../components/constants/theme';
const IconWrapper = styled(Box)({
  cursor: 'pointer',
});

function TemplateIcon(props) {
  const [color, setColor] = useState(props.color);
  return (
    <IconWrapper>
      {' '}
      <TI
        color={color}
        onMouseOver={() => setColor(HighlightColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
TemplateIcon.defaultProps = {
  color: HomeIconDefaultColor,
};

TemplateIcon.propTypes = {
  color: PropTypes.string,
};

export default TemplateIcon;
