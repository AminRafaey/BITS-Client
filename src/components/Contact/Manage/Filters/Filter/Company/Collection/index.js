import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ConditionalSelect from '../../../ConditionalSelect';
import FreeSolo from '../../../FreeSolo';

import { FieldWrapper } from '../../Wrappers';

function Collection(props) {
  const { filters, setFilters, selected, index } = props;
  const [selectedCondition, setSelectedCondition] = useState(
    props.selectedCondition ? props.selectedCondition : 1
  );
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    selected: selected,
    parentKey: 'companies',
    childKey: 'company',
    index: index,
  };

  useEffect(() => {
    if (selected) {
      setFilters({
        ...filters,
        companies: filters.companies.map((company, i) =>
          index === i
            ? selectedCondition === 1
              ? { company: selected }
              : selectedCondition === 2 && {
                  company: { $ne: selected },
                }
            : company
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
        <FreeSolo {...commonProps} selectedCondition={selectedCondition} />
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
