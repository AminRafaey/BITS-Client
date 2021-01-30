import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox as MuiCheckbox } from '@material-ui/core';
import { HoverColor } from '../../constants/theme';

const StyledMuiCheckbox = withStyles({
  root: {
    '& .MuiIconButton-label > .MuiSvgIcon-root': {
      fill: HoverColor,
    },
  },
})(MuiCheckbox);

export const Checkbox = (props) => {
  const { ...other } = props;
  return <StyledMuiCheckbox {...other} />;
};
