import React, { useState } from 'react';
import { default as WI } from './icon.svg';
import PropTypes from 'prop-types';
import { HighlightColor } from '../../components/constants/theme';
import { styled, Box } from '@material-ui/core';
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
  color: '#4AC959',
};

WhatsAppIcon.propTypes = {
  color: PropTypes.string,
};

export default WhatsAppIcon;
