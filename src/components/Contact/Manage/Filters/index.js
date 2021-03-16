import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import { styled, Box, Typography } from '@material-ui/core';
import { LinkColor } from '../../../constants/theme';

const FiltersWrapper = styled(Box)({
  padding: '16px 28px 16px 28px',
});
const HeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

const FiltersTyp = styled(Typography)({
  fontSize: 16,
  fontFamily: 'medium',
});
const ClearTyp = styled(Typography)({
  color: LinkColor,
  fontSize: 14,
});

function Filters(props) {
  return (
    <FiltersWrapper>
      <HeaderWrapper>
        <FiltersTyp>Filters</FiltersTyp>
        <ClearTyp>Clear</ClearTyp>
      </HeaderWrapper>
      <Row />
      <Row />
      <Row />
      <Row />
    </FiltersWrapper>
  );
}
Filters.propTypes = {};

export default Filters;
