import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { TextField } from '../../HOC';
import {
  TextField as MUITextField,
  withStyles,
  Box,
  InputAdornment,
  styled,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { countries } from '../../constants/Countries';
import { HoverColor, HeadingColor } from '../../constants/theme';

const StyledPhoneCode = styled(Typography)({
  fontSize: 13,
});
const StyledAutoComplete = withStyles({
  root: {
    '& .MuiFormControl-root': {
      width: 70,
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  paper: {
    width: 260,
  },
})(Autocomplete);
const StyledTextField = withStyles({
  root: {
    '& .MuiInputBase-root': {
      height: 38,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  },
})(TextField);

const StyledCountrySelectedTextField = withStyles({
  root: {
    '& .MuiInputBase-root': {
      height: 38,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingRight: 0,
    },
    '& .MuiInputBase-root > .MuiInputBase-input': {
      height: 0,
      width: 0,
    },
  },
})(MUITextField);

function PhoneCodeSelect() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const TagName = selectedCountry
    ? StyledCountrySelectedTextField
    : MUITextField;
  return (
    <Box display="flex">
      <StyledAutoComplete
        autoHighlight
        openOnFocus
        closeIcon={false}
        size="small"
        multiple
        options={countries}
        value={countries.filter(
          (c) => selectedCountry && c.label == selectedCountry.label
        )}
        onChange={(e, allValues, type, value) =>
          setSelectedCountry(value.option)
        }
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
        getOptionLabel={(option) => `${option.label} (${'+' + option.phone})`}
        renderOption={(option, { selected, inputValue }) => {
          const matches = match(
            `${option.label} (${'+' + option.phone})`,
            inputValue
          );
          const parts = parse(
            `${option.label} (${'+' + option.phone})`,
            matches
          );

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
        renderTags={() => (
          <ReactCountryFlag
            style={{ height: 25, width: 25 }}
            countryCode={selectedCountry.code}
            svg
          />
        )}
        renderInput={(params) => (
          <TagName
            {...params}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              style: { ...(selectedCountry && { padding: 0 }) },
            }}
          />
        )}
      />
      <StyledTextField
        onBlur={(e) => setMobileNumber(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <StyledPhoneCode>
                {selectedCountry ? '+' + selectedCountry.phone : ''}
              </StyledPhoneCode>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
PhoneCodeSelect.propTypes = {};
export default PhoneCodeSelect;
