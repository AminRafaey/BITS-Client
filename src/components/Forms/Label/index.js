import React, { useEffect, useState } from 'react';
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
  const { personInfo, setPersonInfo, type } = props;
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

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
      cloneLabelState.push({ title: 'Add', default: true });
      setOptions(cloneLabelState);
    }
  }, [labelState]);

  useEffect(() => {
    setPersonInfo({ ...personInfo, labels: options.filter((o) => o.selected) });
  }, [options]);

  const noOptionItem = () => {
    return (
      <Link
        to={'/addLabel'}
        style={{ textDecoration: 'none', width: '100%' }}
        onMouseDown={() =>
          type &&
          type === 'createLead' &&
          window.localStorage.setItem('leadData', JSON.stringify(personInfo))
        }
      >
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
      size="small"
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      value={options.filter((o) => o.selected)}
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
            o._id == selectedOption._id ? { ...o, selected: selectedValue } : o
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
                    o._id == option._id
                      ? { ...o, selected: e.target.checked }
                      : o
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
            key={v._id}
            label={v.title}
            avatarBackground={v.color}
            onDelete={(e) => {
              setOptions(
                options.map((o) =>
                  o._id === v._id ? { ...o, selected: false } : o
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
LabelMultiSelect.propTypes = {
  personInfo: PropTypes.object.isRequired,
  setPersonInfo: PropTypes.func.isRequired,
  type: PropTypes.string,
};
export default LabelMultiSelect;
