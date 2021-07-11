import React from 'react';
import PropTypes from 'prop-types';
import { default as Icon } from './icon.svg';

function Video(props) {
  return <Icon style={{ height: 24, width: 24, ...props.style }} />;
}

Video.propTypes = {};

export default Video;
