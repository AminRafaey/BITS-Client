import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

function City(props) {
  const { filters, setFilters } = props;
  const parentKey = 'cities';
  const childKey = 'city';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    filterName: 'City',
  };

  return <Field {...commonProps} />;
}

City.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default City;
