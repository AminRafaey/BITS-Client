import React from 'react';
import { TextField, withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { HeadingColor } from '../../../../constants/theme';
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
function FreeSolo() {
  return (
    <StyledAutoComplete
      freeSolo
      size="small"
      options={top100Films.map((option) => option)}
      onChange={(e, value) => console.log(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          variant="outlined"
          onChange={(e) => console.log(e.target.value)}
        />
      )}
    />
  );
}
FreeSolo.propTypes = {};
export default FreeSolo;

const top100Films = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Godfather: Part II',
  'The Dark Knight',
  '12 Angry Men',
  "Schindler's List",
  'Pulp Fiction',
];
