import React from 'react';
import { withStyles, Checkbox as MuiCheckbox } from '@material-ui/core';
import { HoverColor } from '../../constants/theme';

const StyledMuiCheckbox = withStyles({
  root: {
    padding: 4,
    '& .MuiIconButton-label > .MuiSvgIcon-root': {
      fill: HoverColor,
    },
  },
})(MuiCheckbox);

const Checkbox = (props) => {
  const { ...other } = props;
  return <StyledMuiCheckbox {...other} />;
};

export default Checkbox;
