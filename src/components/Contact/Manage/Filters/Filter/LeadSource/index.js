import React from 'react';
import PropTypes from 'prop-types';
import FreeSolo from '../FreeSolo';
import { useLeadSourceState } from '../../../../../../Context/LeadSource';

function LeadSource(props) {
  const { filters, setFilters } = props;
  const leadSourceState = useLeadSourceState();
  const parentKey = 'leadSources';
  const childKey = 'leadSource';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    freeSoloOptions: leadSourceState,
    filterName: 'Lead Source',
  };

  return <FreeSolo {...commonProps} />;
}

LeadSource.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default LeadSource;
