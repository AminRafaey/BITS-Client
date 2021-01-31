import React, { useState, useEffect } from 'react';
import { HoverColor } from '../../constants/theme';
import {
  TextField,
  CircularProgress,
  styled,
  Typography,
  withStyles,
  Box,
  Grid,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { keywords } from '../../../Static/Keyword';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Radio } from '../../HOC';

const NoOptionTyp = styled(Typography)({
  cursor: 'pointer',
  color: 'rgba(0, 0, 0, 0.85)',
});
const LabelTyp = styled(Typography)({
  display: 'inline',
  color: 'rgba(0, 0, 0, 0.85)',
  paddingLeft: 52,
  paddingRight: 55,
  fontSize: 14,
});
const AutocompleteWrapper = styled(Box)({
  marginLeft: 36,
});
const RadioGroupWrapper = styled(Box)({
  display: 'inline',
});
const RadioParentWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
const TextAreaWrapper = styled(Box)({});
const BrowseWrapper = styled(Box)({
  marginLeft: '49px',
  marginTop: '5px',
  width: 'fit-content',
  background: '#ffff',
  borderRadius: 5,
  '&:hover': {
    background: HoverColor,
  },
});
const BrowseTyp = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.85)',
  fontSize: 14,
  padding: '2px 4px 2px 4px',
});
const StyledAutoComplete = withStyles({
  root: {
    margin: '8px',
    '& .MuiFormControl-root': {
      width: 200,
    },
    '& .MuiInputBase-root': {
      background: '#ffff',
    },
  },
})(Autocomplete);
const StyledFormControlLabel = withStyles({
  label: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
  },
})(FormControlLabel);

export default function Template() {
  const [textAreaVal, setTextAreaVal] = useState('');

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [textFieldVal, setTextFieldVal] = useState('');
  const [selectedOption, setSelectedOption] = useState({
    id: 2,
    title: 'Mobile Number',
  });
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
    <React.Fragment>
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
      <Grid container>
        <Grid item xs={7}>
          <TextAreaWrapper>
            <textarea
              style={{
                width: '100%',
                minHeight: '160px',
                resize: 'none',
                borderRadius: '42px',
                border: `0px solid #ffff`,
                padding: '1.5rem',
                outlineWidth: '0px',
              }}
              value={textAreaVal}
              id="templateTextArea"
              placeholder="Type your message here..."
              onChange={(e) => {
                setTextAreaVal(e.target.value);
              }}
            />
          </TextAreaWrapper>
        </Grid>
      </Grid>
      <RadioParentWrapper>
        <LabelTyp>Attachment</LabelTyp>
        <RadioGroupWrapper>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <StyledFormControlLabel
                value="image"
                control={<Radio color="primary" />}
                label="Image"
              />
              <StyledFormControlLabel
                value="video"
                control={<Radio color="primary" />}
                label="Video"
              />
              <StyledFormControlLabel
                value="pdf"
                control={<Radio color="primary" />}
                label="Pdf"
              />
            </RadioGroup>
          </FormControl>
        </RadioGroupWrapper>
      </RadioParentWrapper>
      <BrowseWrapper>
        <input
          name="file"
          type="file"
          id="media"
          onChange={(e) => console.log(e)}
          style={{ display: 'none' }}
          accept={'.png,.jpg,.jpeg'}
        />

        <label htmlFor="media" style={{ color: 'white', cursor: 'pointer' }}>
          <BrowseTyp> {'Browse ' + 'image'}</BrowseTyp>
        </label>
      </BrowseWrapper>
    </React.Fragment>
  );
}
