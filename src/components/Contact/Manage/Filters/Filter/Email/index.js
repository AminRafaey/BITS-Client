import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

function Email(props) {
  const { filters, setFilters } = props;
  const parentKey = 'emails';
  const childKey = 'email';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    filterName: 'Email',
  };

  return <Field {...commonProps} />;
}

Email.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Email;
