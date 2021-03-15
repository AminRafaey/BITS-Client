import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AccordionSummary as MuiAccordionSummary } from '@material-ui/core';

const StyledMuiAccordionSummary = withStyles({
  root: {
    padding: 0,
    minHeight: 0,
    '&.Mui-expanded': {
      minHeight: `initial !important`,
    },
    '& .MuiAccordionSummary-content': {
      margin: '0px !important',
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: '0px !important',
    },
  },
  content: {
    width: '100%',
  },
})(MuiAccordionSummary);

export default function AccordionSummary(props) {
  const { children, ...other } = props;
  return (
    <StyledMuiAccordionSummary {...other}>{children}</StyledMuiAccordionSummary>
  );
}
