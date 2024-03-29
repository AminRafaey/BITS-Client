import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  Company,
  LeadSource,
  Country,
  City,
  State,
  FirstName,
  LastName,
  Email,
  Phone,
} from './Filter';
import { getFilteredLeads } from '../../../../api/Lead';
import { useLeadsDispatch, loadLeads } from '../../../../Context/Lead';
import { styled, Box, Typography } from '@material-ui/core';
import { LinkColor } from '../../../constants/theme';
import { initLeadFilters } from '../../../constants/InitialValues';
import { rowsPerPageOptions } from '../../../constants/tablePagination';

const FiltersWrapper = styled(Box)({
  padding: '16px 28px 16px 28px',
});
const HeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

const FiltersTyp = styled(Typography)({
  fontSize: 16,
  fontFamily: 'medium',
});
const ClearTyp = styled(Typography)({
  color: LinkColor,
  fontSize: 14,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

function Filters(props) {
  const { filters, setFilters } = props;
  const leadsDispatch = useLeadsDispatch();
  const prevFilters = useRef(JSON.stringify(filters));

  useEffect(() => {
    if (prevFilters.current !== JSON.stringify(filters)) {
      getFilteredLeads(filters, 0, rowsPerPageOptions[2]).then(
        (res) => res && loadLeads(leadsDispatch, { leads: res })
      );
      prevFilters.current = JSON.stringify(filters);
    }
  }, [filters]);

  useEffect(() => {
    if (localStorage.getItem('filters')) {
      prevFilters.current = localStorage.getItem('filters');
      setFilters(JSON.parse(localStorage.getItem('filters')));
    }
    return () => {
      localStorage.setItem('filters', prevFilters.current);
    };
  }, []);
  const commonProps = { filters: filters, setFilters: setFilters };
  return (
    <FiltersWrapper>
      <HeaderWrapper>
        <FiltersTyp>Filters</FiltersTyp>
        <ClearTyp onClick={() => setFilters(initLeadFilters)}>Clear</ClearTyp>
      </HeaderWrapper>

      <Label {...commonProps} />

      <Company {...commonProps} />

      <LeadSource {...commonProps} />

      <Country {...commonProps} />
      <City {...commonProps} />
      <State {...commonProps} />
      <FirstName {...commonProps} />
      <LastName {...commonProps} />
      <Email {...commonProps} />
      <Phone {...commonProps} />
    </FiltersWrapper>
  );
}
Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default Filters;
