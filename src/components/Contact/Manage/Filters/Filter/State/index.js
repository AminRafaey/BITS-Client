import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

function State(props) {
  const { filters, setFilters } = props;
  const parentKey = 'states';
  const childKey = 'state';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    filterName: 'State',
  };

  return <Field {...commonProps} />;
}

State.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default State;
