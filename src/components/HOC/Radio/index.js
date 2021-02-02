import React from 'react';
import { withStyles, Radio as MuiRadio } from '@material-ui/core';
import { HeadingColor } from '../../constants/theme';

const StyledRadio = withStyles({
  root: {
    color: HeadingColor,
  },
  checked: {},
})(MuiRadio);

const Radio = (props) => {
  const { ...other } = props;
  return <StyledRadio {...other} />;
};

export default Radio;
