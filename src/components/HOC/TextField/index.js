import React from 'react';
import { withStyles, TextField as MuiTextField } from '@material-ui/core';

const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root > .MuiInputBase-input': {
      height: 10,
      fontSize: 13,
    },
  },
})(MuiTextField);

const TextField = (props) => {
  const { ...other } = props;
  return <StyledTextField variant="outlined" size="small" {...other} />;
};

export default TextField;
