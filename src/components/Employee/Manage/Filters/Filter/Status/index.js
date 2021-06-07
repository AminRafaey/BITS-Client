import React from 'react';
import PropTypes from 'prop-types';
import FreeSolo from '../../../../../Contact/Manage/Filters/Filter/FreeSolo';
import { status } from '../../../../../../Static/Status';

function Status(props) {
  const { filters, setFilters } = props;
  const parentKey = 'statuses';
  const childKey = 'status';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    freeSoloOptions: status,
    filterName: 'Status',
  };

  return <FreeSolo {...commonProps} />;
}

Status.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Status;
