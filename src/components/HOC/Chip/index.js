import React from 'react';
import { withStyles, Chip as MuiChip } from '@material-ui/core';

const StyledChip = withStyles({
  label: {
    fontSize: 14,
  },
})(MuiChip);

const Chip = (props) => {
  const { ...other } = props;
  return <StyledChip size="small" variant="outlined" {...other} />;
};

export default Chip;
