import React, { useState } from 'react';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { styled, Typography, withStyles, Box } from '@material-ui/core';
import { ListOption, FileOption } from '../../../components';
import { Radio } from '../../HOC';
const LabelTyp = styled(Typography)({
  display: 'inline',
  color: 'rgba(0, 0, 0, 0.85)',
  paddingLeft: 52,
  paddingRight: 72,
  fontSize: 14,
});

const RadioGroupWrapper = styled(Box)({
  display: 'inline',
});
const RadioParentWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const StyledFormControlLabel = withStyles({
  label: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.85)',
    marginRight: 12,
  },
})(FormControlLabel);

function OptionSelection(props) {
  const [SelectedOption, setSelectedOption] = useState('List');
  return (
    <div>
      <RadioParentWrapper>
        <LabelTyp>Contacts</LabelTyp>
        <RadioGroupWrapper>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <StyledFormControlLabel
                value="List"
                control={
                  <Radio
                    color="primary"
                    checked={SelectedOption === 'List'}
                    onChange={(e) => {
                      e.target.checked && setSelectedOption('List');
                    }}
                  />
                }
                label="List"
              />
              <StyledFormControlLabel
                value="File"
                checked={SelectedOption === 'File'}
                control={
                  <Radio
                    color="primary"
                    onChange={(e) => {
                      e.target.checked && setSelectedOption('File');
                    }}
                  />
                }
                label="File"
              />
            </RadioGroup>
          </FormControl>
        </RadioGroupWrapper>
      </RadioParentWrapper>
      {SelectedOption === 'List' ? <ListOption /> : <FileOption />}
    </div>
  );
}

export default OptionSelection;
