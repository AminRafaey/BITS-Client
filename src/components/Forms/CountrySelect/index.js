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
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <StyledAutoComplete
      autoHighlight
      openOnFocus
      size="small"
      closeIcon={false}
      options={countries}
      onChange={(e, value) => setSelectedCountry(value)}
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
CountrySelect.propTypes = {};
export default CountrySelect;
