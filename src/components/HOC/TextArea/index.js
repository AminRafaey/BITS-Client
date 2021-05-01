import React from 'react';
import { withStyles, TextField as MuiTextField } from '@material-ui/core';
const textFieldStyle = {
  background: '#ffff',
  borderRadius: 5,
  width: '100%',
};
const StyledTextArea = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      fontSize: 13,
      paddingTop: 7.5,
      paddingBottom: 7.5,
    },
  },
})(MuiTextField);

const TextArea = (props) => {
  const { ...other } = props;
  return (
    <StyledTextArea
      multiline
      variant="outlined"
      size="small"
      style={{ ...textFieldStyle }}
      {...other}
    />
  );
};

export default TextArea;
