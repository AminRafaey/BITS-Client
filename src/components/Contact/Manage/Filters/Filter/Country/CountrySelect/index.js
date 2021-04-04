import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import ReactCountryFlag from 'react-country-flag';

import { Box, styled, TextField, withStyles } from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { HoverColor, HeadingColor } from '../../../../../../constants/theme';
import { countries } from '../../../../../../constants/Countries';

const OptionWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
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
  },
})(Autocomplete);
function CountrySelect(props) {
  const { filters, setFilters, selected, selectedCondition, index } = props;
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (selected) {
      setValue(countries.find((c) => c.label === selected));
    }
  }, [selected]);

  return (
    <StyledAutoComplete
      autoHighlight
      openOnFocus
      closeIcon={false}
      size="small"
      options={countries}
      getOptionLabel={(option) => option.label}
      value={value}
      onChange={(e, value) => {
        const selectedOption = value;
        const country = selected
          ? filters.country.map((country, i) =>
              index === i
                ? selectedCondition === 1
                  ? { country: selectedOption.label }
                  : selectedCondition === 2 && {
                      country: { $ne: selectedOption.country },
                    }
                : country
            )
          : [
              ...filters.country,
              selectedCondition === 1
                ? { country: selectedOption.label }
                : selectedCondition === 2 && {
                    country: { $ne: selectedOption.label },
                  },
            ];
        setFilters({ ...filters, country: country });
      }}
      renderOption={(option, { selected, inputValue }) => {
        const matches = match(option.label, inputValue);
        const parts = parse(option.label, matches);

        return (
          <OptionWrapper>
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
          </OptionWrapper>
        );
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
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
CountrySelect.propTypes = {
  selectedCondition: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  selected: PropTypes.string,
  index: PropTypes.number,
};
export default CountrySelect;
