import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

function Phone(props) {
  const { filters, setFilters } = props;
  const parentKey = 'phones';
  const childKey = 'phone';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    filterName: 'Phone',
  };

  return <Field {...commonProps} />;
}

Phone.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Phone;
