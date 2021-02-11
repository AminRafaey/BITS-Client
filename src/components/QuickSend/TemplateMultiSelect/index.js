import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { templates } from '../../../Static/Template';
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

import { HoverColor, HeadingColor } from '../../constants/theme';
const NoOptionTyp = styled(Typography)({
  cursor: 'pointer',
  color: 'rgba(0, 0, 0, 0.85)',
});
const StyledAutoComplete = withStyles({
  root: {
    '& .MuiFormControl-root': {
      width: 200,
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
    },
  },
})(Autocomplete);
export default function TemplateMultiSelect(props) {
  const { setSelectedTemplate } = props;
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
      onChange={(e, value) => {
        setSelectedTemplate(value ? value : {});
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

TemplateMultiSelect.propTypes = {
  setSelectedTemplate: PropTypes.func.isRequired,
};
