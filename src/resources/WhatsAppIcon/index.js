import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { default as WI } from './icon.svg';
import { styled, Box } from '@material-ui/core';
import {
  HighlightColor,
  WhatsAppIconColor,
} from '../../components/constants/theme';
const IconWrapper = styled(Box)({
  cursor: 'pointer',
});

function WhatsAppIcon(props) {
  const [color, setColor] = useState(props.color);
  return (
    <IconWrapper>
      {' '}
      <WI
        color={color}
        onMouseOver={() => setColor(HighlightColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
WhatsAppIcon.defaultProps = {
  color: WhatsAppIconColor,
};

WhatsAppIcon.propTypes = {
  color: PropTypes.string,
};

export default WhatsAppIcon;
