import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {
  useLabelState,
  useLabelDispatch,
  loadLabels,
} from '../../../../../../../Context/Label';
import { getLabels } from '../../../../../../../api/Label';
import {
  Box,
  styled,
  CircularProgress,
  TextField,
  withStyles,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { HoverColor, HeadingColor } from '../../../../../../constants/theme';

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
function LabelSelect(props) {
  const { filters, setFilters, selected, selectedCondition, index } = props;
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
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
      setOptions(Object.keys(labelState).map((l) => labelState[l]));
    }
  }, [labelState]);

  useEffect(() => {
    if (Object.entries(labelState).length > 0 && selected) {
      setValue(labelState[selected]);
    }
  }, [selected]);

  return (
    <StyledAutoComplete
      autoHighlight
      openOnFocus
      closeIcon={false}
      size="small"
      options={options}
      getOptionLabel={(option) => option.title}
      loading={loading}
      value={value}
      onChange={(e, value) => {
        const selectedOption = value;
        const labels = selected
          ? filters.labels.map((label, i) =>
              index === i
                ? selectedCondition === 1
                  ? { labels: selectedOption._id }
                  : selectedCondition === 2 && {
                      labels: { $ne: selectedOption._id },
                    }
                : label
            )
          : [
              ...filters.labels,
              selectedCondition === 1
                ? { labels: selectedOption._id }
                : selectedCondition === 2 && {
                    labels: { $ne: selectedOption._id },
                  },
            ];
        setFilters({ ...filters, labels: labels });
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
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
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
LabelSelect.propTypes = {
  selectedCondition: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  selected: PropTypes.string,
  index: PropTypes.number,
};
export default LabelSelect;
