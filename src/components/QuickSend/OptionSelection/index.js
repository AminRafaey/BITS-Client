import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { styled, Typography, withStyles, Box } from '@material-ui/core';
import { ListOption } from '../../../components';

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
const StyledRadio = withStyles({
  root: {
    color: '#ffff',
  },
  checked: {},
})(Radio);
function OptionSelection(props) {
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
                control={<StyledRadio color="primary" checked={true} />}
                label="List"
              />
              <StyledFormControlLabel
                value="File"
                control={<StyledRadio color="primary" />}
                label="File"
              />
            </RadioGroup>
          </FormControl>
        </RadioGroupWrapper>
      </RadioParentWrapper>
      <ListOption />
    </div>
  );
}

export default OptionSelection;
