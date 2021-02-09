import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { default as CI } from './icon.svg';
import { styled, Box } from '@material-ui/core';
import { HighlightColor, HoverColor } from '../../components/constants/theme';
const IconWrapper = styled(Box)({
  cursor: 'pointer',
});

function ContactIcon(props) {
  const [color, setColor] = useState(props.color);
  return (
    <IconWrapper>
      {' '}
      <CI
        color={color}
        onMouseOver={() => setColor(HoverColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
ContactIcon.defaultProps = {
  color: HighlightColor,
};

ContactIcon.propTypes = {
  color: PropTypes.string,
};

export default ContactIcon;
