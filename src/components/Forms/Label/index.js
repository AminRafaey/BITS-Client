import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { Checkbox, Chip, TextField } from '../../HOC';
import { useLabelState } from '../../../Context/Label';
import stateCloner from '../../utility/StateCloner';
import { Box, Typography, styled, withStyles } from '@material-ui/core';

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
  const { personInfo, setPersonInfo, type, setShowLabelSelect } = props;
  const [options, setOptions] = useState([]);

  const labelState = useLabelState();

  useEffect(() => {
    if (options.length === 0) {
      let cloneLabelState = stateCloner(
        Object.keys(labelState).map((l) => labelState[l])
      );
      if (
        (type === 'edit' || type === 'inbox') &&
        personInfo.labels.length > 0
      ) {
        cloneLabelState = cloneLabelState.map((l) =>
          personInfo.labels.find((p) => p === l._id)
            ? { ...l, selected: true }
            : { ...l }
        );
      }
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
      onClose={() => type === 'inbox' && setShowLabelSelect(false)}
      value={
        options.filter((o) => o.selected)
          ? options.filter((o) => o.selected)
          : ''
      }
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
          placeholder="Select Labels"
          InputProps={{
            ...params.InputProps,
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
  setShowLabelSelect: PropTypes.func,
};
export default LabelMultiSelect;
