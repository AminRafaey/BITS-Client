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

function Company(props) {
  const { filters, setFilters } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [count, setCount] = useState(1);
  const commonProps = { filters: filters, setFilters: setFilters };

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

        {filters.companies.map((company, index) => (
          <AccordionDetails key={index}>
            <Collection
              {...commonProps}
              selected={
                typeof company.company === 'object'
                  ? company.company['$ne']
                  : company.company
              }
              index={index}
              selectedCondition={typeof company.company === 'object' ? 2 : 1}
            />

            <DeleteIconWrapper>
              <DeleteIconInnerWrapper
                onClick={() => {
                  setFilters({
                    ...filters,
                    companies: filters.companies.filter((l, i) => i !== index),
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
        {count > filters.companies.length && (
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
                count <= filters.companies.length &&
                setCount(filters.companies.length + 1)
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

Company.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Company;
