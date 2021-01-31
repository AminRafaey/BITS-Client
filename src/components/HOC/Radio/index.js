import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Radio as MuiRadio } from '@material-ui/core';

const StyledRadio = withStyles({
  root: {
    color: '#ffff',
  },
  checked: {},
})(MuiRadio);

const Radio = (props) => {
  const { ...other } = props;
  return <StyledRadio {...other} />;
};

export default Radio;
