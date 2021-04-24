import React from 'react';
import { withStyles, TextField as MuiTextField } from '@material-ui/core';
const textFieldStyle = {
  background: '#ffff',
  borderRadius: 5,
  width: '100%',
};
const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root > .MuiInputBase-input': {
      height: 10,
      fontSize: 13,
      fontFamily: 'system-ui',
    },
  },
})(MuiTextField);

const TextField = (props) => {
  const { ...other } = props;
  return (
    <StyledTextField
      variant="outlined"
      size="small"
      style={{ ...textFieldStyle }}
      {...other}
    />
  );
};

export default TextField;
