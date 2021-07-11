import React from 'react';
import PropTypes from 'prop-types';
import { default as Icon } from './icon.svg';

function Clip(props) {
  return (
    <Icon color="#000000" style={{ height: 24, width: 24, ...props.style }} />
  );
}

Clip.propTypes = {};

export default Clip;
