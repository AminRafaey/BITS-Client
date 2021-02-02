import React, { useState } from 'react';
import { ListOption, FileOption } from '../../../components';
import { Radio } from '../../HOC';

import {
  styled,
  Typography,
  withStyles,
  Box,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

const LabelTyp = styled(Typography)({
  display: 'inline',
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
    marginRight: 12,
  },
})(FormControlLabel);

function OptionSelection() {
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
