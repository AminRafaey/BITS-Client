import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tabs as MuiTabs } from '@material-ui/core';
import { HomeIconDefaultColor } from '../../../constants/theme';
const StyledMuiTabs = withStyles({
  flexContainer: {
    display: 'block',
    borderBottom: `1px solid ${HomeIconDefaultColor}`,
  },
  fixed: {
    '& .MuiTabs-indicator': {
      backgroundColor: '#ffff',
      borderLeft: `1px solid ${HomeIconDefaultColor}`,
      borderRight: `1px solid ${HomeIconDefaultColor}`,
    },
  },
})(MuiTabs);

export default function Tabs(props) {
  const { children, ...other } = props;
  return <StyledMuiTabs {...other}>{children}</StyledMuiTabs>;
}
