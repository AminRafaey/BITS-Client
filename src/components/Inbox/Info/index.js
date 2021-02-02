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
  minHeight: '200vh',
  background: 'aqua',
});

function Info(props) {
  return (
    <InfoWrapper>
      <About />
      <LabelArea />
      <Notes />
    </InfoWrapper>
  );
}

Info.propTypes = {};

export default Info;
