import React from 'react';
import PropTypes from 'prop-types';
import About from './About';
import LabelArea from './LabelArea';
import Notes from './Notes';
import { styled, Box } from '@material-ui/core';

const InfoWrapper = styled(Box)({
  maxHeight: '100vh',
  overflowY: 'scroll',
});

function Info(props) {
  return (
    <InfoWrapper className="scrollElement">
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
