import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tab as MuiTab } from '@material-ui/core';

const SelectedMuiTab = withStyles({
  root: {
    textTransform: 'none',
    background: '#ffff',
    borderColor: '#cccc',
    borderStyle: 'solid',
    borderWidth: '1px 1px 0px 1px',
  },
})(MuiTab);

export default function SelectedTab(props) {
  const { children, ...other } = props;
  return <SelectedMuiTab {...other}>{children}</SelectedMuiTab>;
}
