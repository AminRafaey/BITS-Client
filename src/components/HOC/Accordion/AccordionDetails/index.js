import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AccordionDetails as MuiAccordionDetails } from '@material-ui/core';

const StyledMuiAccordionDetails = withStyles({
  root: {
    padding: 0,
  },
})(MuiAccordionDetails);

export default function AccordionDetails(props) {
  const { children, ...other } = props;
  return (
    <StyledMuiAccordionDetails {...other}>{children}</StyledMuiAccordionDetails>
  );
}
