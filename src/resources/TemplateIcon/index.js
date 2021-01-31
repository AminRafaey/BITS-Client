import React, { useState } from 'react';
import { default as TI } from './icon.svg';
import PropTypes from 'prop-types';
import { HighlightColor } from '../../components/constants/theme';
import { styled, Box } from '@material-ui/core';
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
  color: '#CCCCCC',
};

TemplateIcon.propTypes = {
  color: PropTypes.string,
};

export default TemplateIcon;
