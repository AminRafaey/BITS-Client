import React from 'react';
import PropTypes from 'prop-types';
import FreeSolo from '../../../../../Contact/Manage/Filters/Filter/FreeSolo';
import { useDesignationState } from '../../../../../../Context/Designation';

function Designation(props) {
  const { filters, setFilters } = props;
  const designationState = useDesignationState();

  const parentKey = 'designations';
  const childKey = 'designation';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    freeSoloOptions: designationState,
    filterName: 'Designation',
  };

  return <FreeSolo {...commonProps} />;
}

Designation.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Designation;
