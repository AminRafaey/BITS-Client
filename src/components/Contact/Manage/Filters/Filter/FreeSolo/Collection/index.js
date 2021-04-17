import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConditionalSelect from '../../../ConditionalSelect';
import Select from '../Select';

import { FieldWrapper } from '../../Wrappers';

function Collection(props) {
  const {
    filters,
    setFilters,
    selected,
    index,
    parentKey,
    childKey,
    freeSoloOptions,
  } = props;
  const [selectedCondition, setSelectedCondition] = useState(
    props.selectedCondition ? props.selectedCondition : 1
  );
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    selected: selected,
    parentKey: parentKey,
    childKey: childKey,
    index: index,
    freeSoloOptions: freeSoloOptions,
  };

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
  return (
    <React.Fragment>
      <FieldWrapper>
        <ConditionalSelect
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Select {...commonProps} selectedCondition={selectedCondition} />
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
  freeSoloOptions: PropTypes.array.isRequired,
};
export default Collection;
