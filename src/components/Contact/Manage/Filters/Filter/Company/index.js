import React from 'react';
import PropTypes from 'prop-types';
import ConditionalSelect from '../../ConditionalSelect';
import FreeSolo from '../../FreeSolo';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../../../../../HOC';
import { Box } from '@material-ui/core';
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

function Company(props) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <Box mt={1.5}>
      <Accordion>
        <AccordionSummary>
          <SummaryWrapper onClick={() => setExpanded(!expanded)}>
            <OptionTyp>Company</OptionTyp>
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
              <FreeSolo />
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

Company.propTypes = {};
export default Company;
