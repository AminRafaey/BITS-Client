import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {
  useLabelState,
  useLabelDispatch,
  loadLabels,
} from '../../../../../Context/Label';
import { getLabels } from '../../../../../api/Label';
import stateCloner from '../../../../utility/StateCloner';
import {
  Box,
  styled,
  CircularProgress,
  TextField,
  withStyles,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { HoverColor, HeadingColor } from '../../../../constants/theme';

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
function OptionSelect(props) {
  const [options, setOptions] = useState([]);
  const loading = true && options.length === 0;

  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();

  useEffect(() => {
    if (!loading) {
      return undefined;
    }
    if (Object.entries(labelState).length < 1) {
      getLabels().then((res) =>
        setTimeout(() => loadLabels(labelDispatch, { labels: res }), 2000)
      );
    }
  }, [loading]);

  useEffect(() => {
    if (options.length === 0) {
      let cloneLabelState = stateCloner(
        Object.keys(labelState).map((l) => labelState[l])
      );
      setOptions(cloneLabelState);
    }
  }, [labelState]);

  return (
    <StyledAutoComplete
      autoHighlight
      openOnFocus
      closeIcon={false}
      size="small"
      options={options}
      getOptionLabel={(option) => option.title}
      loading={loading}
      onChange={(e, allValues, type, value) => {
        const selectedOption = value.option;
        let selectedValue = false;
        if (selectedOption.default) {
          return;
        }
        if (!selectedOption['selected']) {
          selectedValue = true;
        }
        setOptions(
          options.map((o) =>
            o._id == selectedOption._id
              ? { ...o, selected: selectedValue }
              : { ...o, selected: false }
          )
        );
      }}
      renderOption={(option, { selected, inputValue }) => {
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

        return (
          <OptionWrapper>
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
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Label"
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
OptionSelect.propTypes = {};
export default OptionSelect;
