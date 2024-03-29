import React from 'react';
import PropTypes from 'prop-types';
import ReactCountryFlag from 'react-country-flag';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { TextField } from '../../HOC';
import { withStyles } from '@material-ui/core';
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
function CountrySelect(props) {
  const { personInfo, setPersonInfo } = props;
  return (
    <StyledAutoComplete
      autoHighlight
      openOnFocus
      size="small"
      closeIcon={false}
      options={countries}
      value={countries.find((c) => c.label === personInfo.country) || null}
      onChange={(e, value) =>
        setPersonInfo({ ...personInfo, country: value.label })
      }
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
          placeholder="Choose a country"
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}
CountrySelect.propTypes = {
  personInfo: PropTypes.object.isRequired,
  setPersonInfo: PropTypes.func.isRequired,
};
export default CountrySelect;
