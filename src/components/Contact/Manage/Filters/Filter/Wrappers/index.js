import React from 'react';
import PropTypes from 'prop-types';
import { styled, Box, Typography } from '@material-ui/core';
import {
  HeadingColor,
  DelieverStatusColor,
} from '../../../../../constants/theme';

export const iconsStyle = {
  color: DelieverStatusColor,
  height: 12,
};
export const SummaryWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  background: '#ffff',
  height: 32,
  alignItems: 'center',
  paddingLeft: 8,
});

export const AddTyp = styled(Typography)({
  fontSize: 14,
  paddingLeft: '5%',
  background: HeadingColor,
  width: '100%',
  color: DelieverStatusColor,
});
export const OptionTyp = styled(Typography)({
  fontSize: 14,
  width: '100%',
});
export const ArrowIconParentWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});
export const DeleteIconWrapper = styled(Box)({
  background: HeadingColor,
  paddingRight: '3%',
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 16,
});

export const FieldWrapper = styled(Box)({
  width: '100%',
  padding: '16px 16px 0px',
  display: 'flex',
  justifyContent: 'center',
  background: HeadingColor,
});
