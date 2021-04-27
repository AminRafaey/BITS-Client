import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { keywords } from '../../../../Static/Keyword';
import { insertAtCaret } from '../../utility';
import {
  TextField,
  CircularProgress,
  styled,
  Typography,
  withStyles,
  Box,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { HoverColor, HeadingColor } from '../../../constants/theme';

const NoOptionTyp = styled(Typography)({
  cursor: 'pointer',
});
const AutocompleteWrapper = styled(Box)({
  marginLeft: 36,
});
const StyledAutoComplete = withStyles({
  root: {
    margin: '8px',
    '& .MuiFormControl-root': {
      width: 200,
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
    },
  },
})(Autocomplete);
function KeywordSelect(props) {
  const { setMessage, templateTextAreaRef } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [textFieldVal, setTextFieldVal] = useState('');
  const loading = open && options.length === 0;

  useEffect(() => {
    if (!loading) {
      return undefined;
    }

    (async () => {
      if (true) {
        setOptions(keywords);
      }
    })();
  }, [loading]);
  return (
    <AutocompleteWrapper>
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
          insertAtCaret(
            templateTextAreaRef,
            ` __${value.title}__ `,
            setMessage
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Insert Keyword"
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
    </AutocompleteWrapper>
  );
}

KeywordSelect.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default KeywordSelect;
