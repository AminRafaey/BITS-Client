import React from 'react';
import PropTypes from 'prop-types';
import FreeSolo from '../../../../../Contact/Manage/Filters/Filter/FreeSolo';
import { roles } from '../../../../../../Static/Role';

function Role(props) {
  const { filters, setFilters } = props;

  const parentKey = 'roles';
  const childKey = 'role';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    freeSoloOptions: roles,
    filterName: 'Role',
  };

  return <FreeSolo {...commonProps} />;
}

Role.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Role;
