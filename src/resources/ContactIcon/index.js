import React, { useState } from 'react';
import { default as CI } from './icon.svg';
import PropTypes from 'prop-types';
import { HighlightColor } from '../../components/constants/theme';
import { styled, Box } from '@material-ui/core';
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
        onMouseOver={() => setColor(HighlightColor)}
        onMouseLeave={() => setColor(props.color)}
      />
    </IconWrapper>
  );
}
ContactIcon.defaultProps = {
  color: '#CCCCCC',
};

ContactIcon.propTypes = {
  color: PropTypes.string,
};

export default ContactIcon;
