import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, AccordionDetails, AccordionSummary } from '../../../HOC';
import {
  styled,
  Box,
  Typography,
  withStyles,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { HeadingColor, DelieverStatusColor } from '../../../constants/theme';

const iconsStyle = {
  color: DelieverStatusColor,
  height: 12,
};
const SummaryWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  background: '#ffff',
  height: 32,
  alignItems: 'center',
  paddingLeft: 8,
});

const AddTyp = styled(Typography)({
  fontSize: 14,
  paddingLeft: '5%',
  background: HeadingColor,
  width: '100%',
  color: DelieverStatusColor,
});
const OptionTyp = styled(Typography)({
  fontSize: 14,
});
const ArrowIconParentWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});
const DeleteIconWrapper = styled(Box)({
  background: HeadingColor,
  paddingRight: '3%',
  display: 'flex',
  justifyContent: 'flex-end',
});

const AutoCompleteWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  background: HeadingColor,
});

const StyledAutoComplete = withStyles({
  root: {
    width: '90%',
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiInputBase-root': {
      background: HeadingColor,
    },
  },
})(Autocomplete);
function Row(props) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Box mt={1.5}>
      <Accordion>
        <AccordionSummary>
          <SummaryWrapper onClick={() => setExpanded(!expanded)}>
            <OptionTyp>Label</OptionTyp>
            <ArrowIconParentWrapper>
              {expanded ? (
                <RemoveIcon style={{ ...iconsStyle }} />
              ) : (
                <AddIcon style={{ ...iconsStyle }} />
              )}
            </ArrowIconParentWrapper>
          </SummaryWrapper>
        </AccordionSummary>

        {['amin', 'hamza'].map((m, index) => (
          <AccordionDetails key={index}>
            <AutoCompleteWrapper>
              <StyledAutoComplete
                freeSolo
                options={[]}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} margin="normal" variant="outlined" />
                )}
              />
            </AutoCompleteWrapper>
            {index !== 0 && (
              <DeleteIconWrapper>
                <DeleteIcon
                  style={{ color: DelieverStatusColor, height: 16 }}
                />
              </DeleteIconWrapper>
            )}
          </AccordionDetails>
        ))}
        <AccordionDetails>
          <AddTyp>+Add</AddTyp>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

Row.propTypes = {};
export default Row;
