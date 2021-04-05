import React from 'react';
import PropTypes from 'prop-types';
import FreeSolo from '../FreeSolo';
import { useCompanyState } from '../../../../../../Context/Company';

function Company(props) {
  const { filters, setFilters } = props;
  const companyState = useCompanyState();
  const parentKey = 'companies';
  const childKey = 'company';
  const commonProps = {
    filters: filters,
    setFilters: setFilters,
    parentKey: parentKey,
    childKey: childKey,
    freeSoloOptions: companyState,
    filterName: 'Company',
  };

  return <FreeSolo {...commonProps} />;
}

Company.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
export default Company;
