import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Accordion as MuiAccordion } from '@material-ui/core';

const StyledMuiAccordion = withStyles({
  root: {
    position: 'static',
    boxShadow: 'none',
    background: 'inherit',
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  expanded: {
    margin: 0,
  },
})(MuiAccordion);

export default function Accordion(props) {
  const { children, ...other } = props;
  return <StyledMuiAccordion {...other}>{children}</StyledMuiAccordion>;
}
