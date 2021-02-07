import React from 'react';
import PropTypes from 'prop-types';
import About from './About';
import LabelArea from './LabelArea';
import Notes from './Notes';
import { styled, Box } from '@material-ui/core';

const InfoWrapper = styled(Box)({
  position: 'fixed',
  overflowY: 'scroll',
  top: '0',
  bottom: '0',
});

function Info(props) {
  return (
    <InfoWrapper id="Chat-Box-Styled-Scroll">
      <About />
      <LabelArea />
      <Notes />
      <Notes />
      <Notes />
    </InfoWrapper>
  );
}

Info.propTypes = {};

export default Info;
