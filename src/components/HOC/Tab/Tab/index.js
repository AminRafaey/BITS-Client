import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tab as MuiTab } from '@material-ui/core';

const StyledMuiTab = withStyles({
  root: {
    textTransform: 'none',
  },
})(MuiTab);

export default function Tab(props) {
  const { children, ...other } = props;
  return <StyledMuiTab {...other}>{children}</StyledMuiTab>;
}
