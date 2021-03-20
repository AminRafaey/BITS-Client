import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { TextField, withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { countries } from '../../constants/Countries';
import { HoverColor, HeadingColor } from '../../constants/theme';

const StyledAutoComplete = withStyles({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      '& .MuiFormLabel-root': {
        color: '#BBBBBB',
        fontSize: 13,
      },
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
    },
  },
})(Autocomplete);
function CountrySelect() {
  const [open, setOpen] = useState(false);

  return (
    <StyledAutoComplete
      autoHighlight
      openOnFocus
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      size="small"
      options={countries}
      filterOptions={(options, { inputValue, selected }) => {
        if (inputValue != '') {
          options = options.filter((option) =>
            `${option.label}${option.phone}`
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          );
          return options;
        } else return options;
      }}
      getOptionLabel={(option) => option.label}
      renderOption={(option, { selected, inputValue }) => {
        const matches = match(`${option.label}`, inputValue);
        const parts = parse(`${option.label}`, matches);

        return (
          <div>
            <ReactCountryFlag
              countryCode={option.code}
              svg
              style={{ marginRight: 16 }}
            />
            {parts.map((part, index) => {
              return (
                <span
                  key={index}
                  style={{ ...(part.highlight && { color: HoverColor }) }}
                >
                  {part.text}
                </span>
              );
            })}
          </div>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}

export default CountrySelect;
