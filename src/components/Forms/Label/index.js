import React, { useEffect, useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { Checkbox, Chip } from '../../HOC';
import {
  useLabelState,
  useLabelDispatch,
  loadLabels,
} from '../../../Context/Label';
import { getLabels } from '../../../api/Label';
import stateCloner from '../../utility/StateCloner';
import {
  Box,
  Typography,
  styled,
  CircularProgress,
  TextField,
  withStyles,
} from '@material-ui/core';

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
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();

  useEffect(() => {
    if (!loading) {
      return undefined;
    }
    if (labelState.length < 1) {
      getLabels()
        .then((res) => {
          res.push({ title: 'Add', default: true });
          return res;
        })
        .then((res) =>
          setTimeout(() => loadLabels(labelDispatch, { labels: res }), 2000)
        );
    }
  }, [loading]);

  useEffect(() => {
    options.length === 0 && setOptions(stateCloner(labelState));
  }, [labelState]);

  const noOptionItem = () => {
    return (
      <Link to={'/addLabel'} style={{ textDecoration: 'none', width: '100%' }}>
        <NoOptionTyp>+ Add</NoOptionTyp>
      </Link>
    );
  };
  return (
    <StyledAutoComplete
      autoHighlight
      openOnFocus
      disableCloseOnSelect
      multiple
      closeIcon={false}
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
      value={options.filter((o) => o.selected)}
      onChange={(e, allValues, type, value) => {
        const selectedOption = value.option;
        let selectedValue = false;
        if (selectedOption.default) {
          setOpen(false);
          return;
        }
        if (!selectedOption['selected']) {
          selectedValue = true;
        }
        setOptions(
          options.map((o) =>
            o.id == selectedOption.id ? { ...o, selected: selectedValue } : o
          )
        );
      }}
      renderOption={(option, { selected, inputValue }) => {
        if (option.default) {
          return noOptionItem();
        }
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

        return (
          <OptionWrapper>
            <Checkbox
              mr={8}
              onChange={(e) =>
                setOptions(
                  options.map((o) =>
                    o.id == option.id ? { ...o, selected: e.target.checked } : o
                  )
                )
              }
              checked={option.selected ? true : false}
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
      noOptionsText={noOptionItem()}
      renderTags={(values) =>
        values.map((v) => (
          <Chip
            key={v.id}
            label={v.title}
            onDelete={(e) => {
              setOptions(
                options.map((o) =>
                  o.id === v.id ? { ...o, selected: false } : o
                )
              );
            }}
          />
        ))
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
