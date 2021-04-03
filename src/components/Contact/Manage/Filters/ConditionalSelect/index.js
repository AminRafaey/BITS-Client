import React from 'react';
import { withStyles, FormControl } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { HeadingColor } from '../../../../constants/theme';

const StyledFormControl = withStyles({
  root: {
    width: '100%',

    '& .MuiOutlinedInput-root': {
      width: '100%',
      height: 36,

      '& .MuiOutlinedInput-input': {
        padding: '8px 14px',
        background: HeadingColor,
      },
    },
  },
})(FormControl);
function ConditionalSelect() {
  const [option, setOption] = React.useState(1);

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <StyledFormControl>
      <Select value={option} onChange={handleChange} variant="outlined">
        <MenuItem value={1}>is</MenuItem>
        <MenuItem value={2}>isn't</MenuItem>
      </Select>
    </StyledFormControl>
  );
}
ConditionalSelect.propTypes = {};
export default ConditionalSelect;
