import React from 'react';
import PropTypes from 'prop-types';
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
function ConditionalSelect(props) {
  const { selectedCondition, setSelectedCondition } = props;

  const handleChange = (event) => {
    setSelectedCondition(event.target.value);
  };

  return (
    <StyledFormControl>
      <Select
        value={selectedCondition}
        onChange={handleChange}
        variant="outlined"
      >
        <MenuItem value={1}>is</MenuItem>
        <MenuItem value={2}>isn't</MenuItem>
      </Select>
    </StyledFormControl>
  );
}
ConditionalSelect.propTypes = {
  selectedCondition: PropTypes.number.isRequired,
  setSelectedCondition: PropTypes.func.isRequired,
};
export default ConditionalSelect;
