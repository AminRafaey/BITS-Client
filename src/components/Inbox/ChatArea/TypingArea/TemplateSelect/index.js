import React, { useState, useEffect } from 'react';
import { templates } from '../../../../../Static/Template';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import {
  TextField,
  CircularProgress,
  styled,
  Typography,
  withStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { HoverColor, HeadingColor } from '../../../../constants/theme';
const NoOptionTyp = styled(Typography)({
  cursor: 'pointer',
  color: 'rgba(0, 0, 0, 0.85)',
});
const StyledAutoComplete = withStyles({
  root: {
    '& .MuiFormControl-root': {
      width: 130,
      '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiFormLabel-root': {
        fontSize: 13,
      },
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
    },
  },
})(Autocomplete);
export default function TemplateSelect() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [textFieldVal, setTextFieldVal] = useState('');
  const [selectedOption, setSelectedOption] = useState({
    title: 'Sale',
    id: 1,
    content: 'Hey __name__, We are now offering 20% sale on winters products',
  });
  const loading = open && options.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      if (true) {
        setOptions(templates);
      }
    })();
  }, [loading]);

  return (
    <StyledAutoComplete
      closeIcon={false}
      autoHighlight
      openOnFocus
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={selectedOption}
      size="small"
      getOptionSelected={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderOption={(option, { selected, inputValue }) => {
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

        return (
          <div>
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
      noOptionsText={
        <NoOptionTyp
          onMouseDown={() => {
            setTextFieldVal('');
          }}
        >
          + Add {textFieldVal}
        </NoOptionTyp>
      }
      onChange={(e, allValues, type, value) => {
        setSelectedOption(value.option);
        setTextFieldVal(value.option.title);
      }}
      inputValue={textFieldVal}
      onInputChange={(event, newInputValue, reason) => {
        setTextFieldVal(reason === 'input' ? newInputValue : textFieldVal);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Template"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
