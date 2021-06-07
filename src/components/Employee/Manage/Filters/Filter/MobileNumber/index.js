import React from 'react';
import PropTypes from 'prop-types';
import Field from '../../../../../Contact/Manage/Filters/Filter/Field';

function MobileNumber(props) {
  const { filters, setFilters } = props;
  const parentKey = 'mobileNumbers';
  const childKey = 'mobileNumber';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    filterName: 'Phone',
  };

  return <Field {...commonProps} />;
}

MobileNumber.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default MobileNumber;
