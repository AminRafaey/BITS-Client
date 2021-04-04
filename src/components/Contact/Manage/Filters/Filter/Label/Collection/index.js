import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConditionalSelect from '../../../ConditionalSelect';
import LabelSelect from '../LabelSelect';

import { FieldWrapper } from '../../Wrappers';

function Collection(props) {
  const { filters, setFilters, selected, index } = props;
  const [selectedCondition, setSelectedCondition] = useState(1);
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    selected: selected,
  };

  useEffect(() => {
    if (selected) {
      setFilters({
        ...filters,
        labels: filters.labels.map((label, i) =>
          index === i
            ? selectedCondition === 1
              ? { labels: selected }
              : selectedCondition === 2 && {
                  labels: { $ne: selected },
                }
            : label
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
        <LabelSelect
          {...commonProps}
          selectedCondition={selectedCondition}
          index={index}
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
};
export default Collection;
