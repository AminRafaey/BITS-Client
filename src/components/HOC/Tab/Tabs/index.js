import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tabs as MuiTabs } from '@material-ui/core';

const StyledMuiTabs = withStyles({
  flexContainer: {
    display: 'block',
    borderBottom: '1px solid #cccc',
  },
  fixed: {
    '& .MuiTabs-indicator': {
      backgroundColor: '#ffff',
      borderLeft: '1px solid #cccc',
      borderRight: '1px solid #cccc',
    },
  },
})(MuiTabs);

export default function Tabs(props) {
  const { children, ...other } = props;
  return <StyledMuiTabs {...other}>{children}</StyledMuiTabs>;
}
