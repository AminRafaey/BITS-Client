import React from 'react';
import PropTypes from 'prop-types';
import About from './About';
import LabelArea from './LabelArea';
import Notes from './Notes';
import { styled, Box } from '@material-ui/core';
import { HomeIconDefaultColor } from '../../constants/theme';

const InfoWrapper = styled(Box)({
  maxHeight: '100vh',
  overflowY: 'scroll',
});

const EmptyWrapper = styled(Box)({
  width: '100%',
  height: 1,
  background: HomeIconDefaultColor,
});
function Info(props) {
  return (
    <InfoWrapper className="scrollElement">
      <About />
      <EmptyWrapper />
      <LabelArea />
      <EmptyWrapper />
      <Notes />
      <EmptyWrapper />
      <Notes />
      <EmptyWrapper />
      <Notes />
    </InfoWrapper>
  );
}

Info.propTypes = {};

export default Info;
