import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collection from './Collection';
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
  DeleteIconInnerWrapper,
  AddWrapper,
} from '../Wrappers';

function Label(props) {
  const { filters, setFilters } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [count, setCount] = useState(1);
  const commonProps = { filters: filters, setFilters: setFilters };
  console.log(filters);
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

        {filters.labels.map((label, index) => (
          <AccordionDetails key={index}>
            <Collection
              {...commonProps}
              selected={
                typeof label.labels === 'object'
                  ? label.labels['$ne']
                  : label.labels
              }
              index={index}
            />

            <DeleteIconWrapper>
              <DeleteIconInnerWrapper
                onClick={() => {
                  setFilters({
                    ...filters,
                    labels: filters.labels.filter((l, i) => i !== index),
                  });
                  count !== 1 && setCount(1);
                }}
              >
                <DeleteIcon
                  style={{ color: DelieverStatusColor, height: 16 }}
                />
              </DeleteIconInnerWrapper>
            </DeleteIconWrapper>
          </AccordionDetails>
        ))}
        {count > filters.labels.length && (
          <AccordionDetails>
            <Collection {...commonProps} />

            {count !== 1 && (
              <DeleteIconWrapper>
                <DeleteIconInnerWrapper onClick={() => setCount(1)}>
                  <DeleteIcon
                    style={{ color: DelieverStatusColor, height: 16 }}
                  />
                </DeleteIconInnerWrapper>
              </DeleteIconWrapper>
            )}
          </AccordionDetails>
        )}
        <AccordionDetails>
          <AddWrapper>
            <AddTyp
              onClick={() =>
                count <= filters.labels.length &&
                setCount(filters.labels.length + 1)
              }
            >
              +Add
            </AddTyp>
          </AddWrapper>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

Label.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Label;
