import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

function LastName(props) {
  const { filters, setFilters } = props;
  const parentKey = 'lastNames';
  const childKey = 'lastName';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    filterName: 'Last Name',
  };

  return <Field {...commonProps} />;
}

LastName.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default LastName;
