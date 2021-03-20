import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Chip } from '../../HOC';
import {
  Box,
  Typography,
  styled,
  CircularProgress,
  TextField,
  withStyles,
} from '@material-ui/core';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { HoverColor, HeadingColor } from '../../constants/theme';

const NoOptionTyp = styled(Typography)({
  cursor: 'pointer',
  color: 'rgba(0, 0, 0, 0.85)',
});

const OptionWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
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
function LabelMultiSelect(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([
    { title: 'New' },
    { title: 'Important' },
    { title: 'Add', default: true },
  ]);
  const [textFieldVal, setTextFieldVal] = React.useState('');
  const loading = open && options.length === 0;
  return (
    <StyledAutoComplete
      autoHighlight
      openOnFocus
      disableCloseOnSelect
      multiple
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
        if (option.default) {
          return (
            <NoOptionTyp onMouseDown={() => {}}>
              + Add {textFieldVal}
            </NoOptionTyp>
          );
        }
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

        return (
          <OptionWrapper>
            <Checkbox mr={8} onChange={(e) => {}} />
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
      noOptionsText={
        <NoOptionTyp
          onMouseDown={() => {
            setTextFieldVal('');
          }}
        >
          + Add {textFieldVal}
        </NoOptionTyp>
      }
      onChange={(e, value) => {}}
      renderTags={(values) =>
        values.map((v) => <Chip key={v.title} label={v.title} />)
      }
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
LabelMultiSelect.propTypes = {};
export default LabelMultiSelect;
