import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
function FreeSolo(props) {
  const {
    filters,
    setFilters,
    selected,
    selectedCondition,
    index,
    parentKey,
    childKey,
  } = props;
  const [inputValue, setInputValue] = useState(selected ? selected : '');

  const updateFilter = () => {
    const value = selected
      ? filters[parentKey].map((v, i) =>
          index === i
            ? selectedCondition === 1
              ? { [childKey]: inputValue }
              : selectedCondition === 2 && {
                  [childKey]: { $ne: inputValue },
                }
            : v
        )
      : [
          ...filters[parentKey],
          selectedCondition === 1
            ? { [childKey]: inputValue }
            : selectedCondition === 2 && {
                [childKey]: { $ne: inputValue },
              },
        ];
    setFilters({ ...filters, [parentKey]: value });
  };
  return (
    <StyledAutoComplete
      freeSolo
      autoHighlight
      openOnFocus
      closeIcon={false}
      size="small"
      options={top100Films.map((option) => option)}
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
          onBlur={(e) => updateFilter()}
        />
      )}
    />
  );
}
FreeSolo.propTypes = {
  selectedCondition: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  selected: PropTypes.string,
  index: PropTypes.number,
  parentKey: PropTypes.string.isRequired,
  childKey: PropTypes.string.isRequired,
};
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
