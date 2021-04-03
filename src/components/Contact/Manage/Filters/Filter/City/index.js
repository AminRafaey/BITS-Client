import React from 'react';
import PropTypes from 'prop-types';
import ConditionalSelect from '../../ConditionalSelect';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../../../../HOC';
import { Box, TextField, withStyles } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { DelieverStatusColor } from '../../../../../constants/theme';
import {
  iconsStyle,
  SummaryWrapper,
  AddTyp,
  OptionTyp,
  ArrowIconParentWrapper,
  DeleteIconWrapper,
  FieldWrapper,
} from '../Wrappers';

const StyledTextField = withStyles({
  root: {
    height: 36,
  },
})(TextField);
function City(props) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Box mt={1.5}>
      <Accordion>
        <AccordionSummary>
          <SummaryWrapper onClick={() => setExpanded(!expanded)}>
            <OptionTyp>City</OptionTyp>
            <ArrowIconParentWrapper>
              {expanded ? (
                <RemoveIcon style={{ ...iconsStyle }} />
              ) : (
                <AddIcon style={{ ...iconsStyle }} />
              )}
            </ArrowIconParentWrapper>
          </SummaryWrapper>
        </AccordionSummary>

        {[1, 2].map((m, index) => (
          <AccordionDetails key={index}>
            <FieldWrapper>
              <ConditionalSelect />
            </FieldWrapper>
            <FieldWrapper>
              <StyledTextField
                size="small"
                variant="outlined"
                placeholder="City"
                onBlur={(e) => {}}
              />
            </FieldWrapper>
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

City.propTypes = {};
export default City;
