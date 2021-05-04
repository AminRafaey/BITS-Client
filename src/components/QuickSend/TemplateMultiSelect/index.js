import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {
  useTemplateState,
  useTemplateDispatch,
  loadTemplates,
} from '../../../Context/Template';
import { getTemplates } from '../../../api/template';
import {
  TextField,
  CircularProgress,
  styled,
  Typography,
  withStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { HoverColor, HeadingColor } from '../../constants/theme';
import stateCloner from '../../utility/StateCloner';
const NoOptionTyp = styled(Typography)({
  cursor: 'pointer',
  color: 'rgba(0, 0, 0, 0.85)',
});
const StyledInboxAutoComplete = withStyles({
  root: {
    '& .MuiFormControl-root': {
      width: 215,
      '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiFormLabel-root': {
        fontSize: 14,
      },
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
    },
  },
})(Autocomplete);
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
  const { setSelectedTemplate, type } = props;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [textFieldVal, setTextFieldVal] = useState('');
  const templateState = useTemplateState();
  const templateDispatch = useTemplateDispatch();
  const loading = open && options.length === 0;

  const TagName =
    type === 'inbox' ? StyledInboxAutoComplete : StyledAutoComplete;

  useEffect(() => {
    if (open) {
      if (templateState.length < 1) {
        getTemplates().then((res) => {
          loadTemplates(templateDispatch, { templates: res });
          updateOptions(res);
        });
      } else {
        updateOptions(templateState);
      }
    }
  }, [open]);

  const updateOptions = (templateState) => {
    const templateClone = stateCloner(templateState);
    templateClone.push({ title: 'Add', default: true });
    setOptions(templateClone);
  };

  const noOptionItem = () => {
    return (
      <Link
        to={'/addTemplate'}
        style={{ textDecoration: 'none', width: '100%' }}
        onMouseDown={() => {}}
      >
        <NoOptionTyp>+ Add</NoOptionTyp>
      </Link>
    );
  };

  return (
    <TagName
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
        if (option.default) {
          return noOptionItem();
        }
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
      onChange={(e, value) => {
        if (value && value.default) {
          return;
        }

        setSelectedTemplate(value ? value : {});
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...(type !== 'inbox' && { label: 'Select Template' })}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            ...(type === 'inbox' && { placeholder: 'Select Template' }),
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
  type: PropTypes.string,
};
