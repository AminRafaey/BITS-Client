import React from 'react';
import PropTypes from 'prop-types';
import { default as Icon } from './icon.svg';

function DefaultMedia(props) {
  return <Icon style={{ height: 24, width: 24 }} />;
}

DefaultMedia.propTypes = {};

export default DefaultMedia;
