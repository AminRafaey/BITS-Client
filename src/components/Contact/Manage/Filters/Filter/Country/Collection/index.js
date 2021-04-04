import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConditionalSelect from '../../../ConditionalSelect';
import CountrySelect from '../CountrySelect';

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
        country: filters.country.map((country, i) =>
          index === i
            ? selectedCondition === 1
              ? { country: selected }
              : selectedCondition === 2 && {
                  country: { $ne: selected },
                }
            : country
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
        <CountrySelect
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
