import React, { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { TextField } from '../../HOC';
import { TextField as MUITextField, withStyles, Box } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { countries } from '../../constants/Countries';
import { HoverColor, HeadingColor } from '../../constants/theme';

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
export default function PhoneCodeSelect() {
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex">
      <StyledAutoComplete
        autoHighlight
        openOnFocus
        closeIcon={false}
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
        renderInput={(params) => (
          <MUITextField
            {...params}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
      <StyledTextField
        style={{
          background: '#ffff',
          borderRadius: 5,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          width: '100%',
        }}
      />
    </Box>
  );
}
