import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConditionalSelect from '../../../ConditionalSelect';
import { withStyles, TextField } from '@material-ui/core';
import { FieldWrapper } from '../../Wrappers';

const StyledTextField = withStyles({
  root: {
    height: 36,
  },
})(TextField);

function Collection(props) {
  const {
    filters,
    setFilters,
    selected,
    index,
    parentKey,
    childKey,
    filterName,
  } = props;
  const [selectedCondition, setSelectedCondition] = useState(
    props.selectedCondition ? props.selectedCondition : 1
  );
  const [fieldVal, setFieldVal] = useState('');

  useEffect(() => {
    if (selected) {
      setFilters({
        ...filters,
        [parentKey]: filters[parentKey].map((value, i) =>
          index === i
            ? selectedCondition === 1
              ? { [childKey]: selected }
              : selectedCondition === 2 && {
                  [childKey]: { $ne: selected },
                }
            : value
        ),
      });
    }
  }, [selectedCondition]);

  const updateFilter = (inputValue) => {
    const value = selected
      ? filters[parentKey].map((v, i) =>
          index === i
            ? selectedCondition === 1
              ? { [childKey]: inputValue }
              : selectedCondition === 2 && {
                  [childKey]: { $ne: inputValue },
                }
            : v
        )
      : [
          ...filters[parentKey],
          selectedCondition === 1
            ? { [childKey]: inputValue }
            : selectedCondition === 2 && {
                [childKey]: { $ne: inputValue },
              },
        ];
    setFilters({ ...filters, [parentKey]: value });
  };

  useEffect(() => {
    selected && setFieldVal(selected);
  }, [selected]);
  return (
    <React.Fragment>
      <FieldWrapper>
        <ConditionalSelect
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
        />
      </FieldWrapper>
      <FieldWrapper>
        <StyledTextField
          value={fieldVal}
          size="small"
          variant="outlined"
          placeholder={filterName}
          onChange={(e) => setFieldVal(e.target.value)}
          onBlur={(e) => updateFilter(e.target.value)}
        />
      </FieldWrapper>
    </React.Fragment>
  );
}

Collection.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  selected: PropTypes.string,
  index: PropTypes.number,
  parentKey: PropTypes.string.isRequired,
  childKey: PropTypes.string.isRequired,
  filterName: PropTypes.string.isRequired,
};
export default Collection;
