import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Collection from '../Field/Collection';
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

function Field(props) {
  const { filters, setFilters, parentKey, childKey, filterName } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [count, setCount] = useState(1);
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    filterName: filterName,
  };

  return (
    <Box mt={1.5}>
      <Accordion>
        <AccordionSummary>
          <SummaryWrapper onClick={() => setExpanded(!expanded)}>
            <OptionTyp>{filterName}</OptionTyp>
            <ArrowIconParentWrapper>
              {expanded ? (
                <RemoveIcon style={{ ...iconsStyle }} />
              ) : (
                <AddIcon style={{ ...iconsStyle }} />
              )}
            </ArrowIconParentWrapper>
          </SummaryWrapper>
        </AccordionSummary>

        {filters[parentKey].map((value, index) => (
          <AccordionDetails key={index}>
            <Collection
              {...commonProps}
              selected={
                typeof value[childKey] === 'object'
                  ? value[childKey]['$ne']
                  : value[childKey]
              }
              index={index}
              selectedCondition={typeof value[childKey] === 'object' ? 2 : 1}
            />

            <DeleteIconWrapper>
              <DeleteIconInnerWrapper
                onClick={() => {
                  setFilters({
                    ...filters,
                    [parentKey]: filters[parentKey].filter(
                      (l, i) => i !== index
                    ),
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
        {count > filters[parentKey].length && (
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
                count <= filters[parentKey].length &&
                setCount(filters[parentKey].length + 1)
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

Field.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  parentKey: PropTypes.string.isRequired,
  childKey: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
};
export default Field;
