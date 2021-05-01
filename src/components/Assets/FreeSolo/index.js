import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../../HOC';
import { useCompanyState } from '../../../Context/Company';
import { withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { HeadingColor } from '../../constants/theme';

const StyledAutoComplete = withStyles({
  root: {
    width: '100%',
    height: 36,

    '& .MuiFormControl-root': {
      '& .MuiFormLabel-root': {
        color: '#BBBBBB',
        fontSize: 13,
      },
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
    },
    '& .MuiFormControl-marginNormal': {
      marginTop: 0,
    },
  },
})(Autocomplete);
function FreeSolo(props) {
  const { options, value, onBlur, placeholder } = props;

  const [inputValue, setInputValue] = useState(value ? value : '');
  const companyState = useCompanyState();

  return (
    <StyledAutoComplete
      freeSolo
      autoHighlight
      openOnFocus
      closeIcon={false}
      size="small"
      options={options.map((option) => option)}
      onChange={(e, value) => setInputValue(value)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue, reason) => {
        reason === 'input' && setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          variant="outlined"
          placeholder={placeholder}
          onBlur={(e) => onBlur(e)}
        />
      )}
    />
  );
}
FreeSolo.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default FreeSolo;
