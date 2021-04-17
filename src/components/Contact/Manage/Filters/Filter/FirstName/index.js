import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

function FirstName(props) {
  const { filters, setFilters } = props;
  const parentKey = 'firstNames';
  const childKey = 'firstName';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    filterName: 'First Name',
  };

  return <Field {...commonProps} />;
}

FirstName.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default FirstName;
