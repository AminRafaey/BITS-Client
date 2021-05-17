import React from 'react';
import PropTypes from 'prop-types';
import { default as Icon } from './icon.svg';

function Image(props) {
  return <Icon style={{ height: 24, width: 24 }} />;
}

Image.propTypes = {};

export default Image;
