import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  FirstName,
  LastName,
  Email,
  Phone,
} from '../../../Contact/Manage/Filters/Filter';
import { Role, Status } from './Filter';
import { getFilteredLeads } from '../../../../api/Lead';
import { useLeadsDispatch, loadLeads } from '../../../../Context/Lead';
import { styled, Box, Typography } from '@material-ui/core';
import { LinkColor } from '../../../constants/theme';
import { initEmployeeFilters } from '../../../constants/InitialValues';

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
  const [filters, setFilters] = useState(initEmployeeFilters);
  const leadsDispatch = useLeadsDispatch();
  const prevFilters = useRef(JSON.stringify(filters));

  useEffect(() => {
    if (prevFilters.current !== JSON.stringify(filters)) {
      getFilteredLeads(filters).then(
        (res) => res && loadLeads(leadsDispatch, { leads: res })
      );
      prevFilters.current = JSON.stringify(filters);
    }
  }, [filters]);

  // useEffect(() => {
  //   if (localStorage.getItem('filters')) {
  //     prevFilters.current = localStorage.getItem('filters');
  //     setFilters(JSON.parse(localStorage.getItem('filters')));
  //   }
  //   return () => {
  //     localStorage.setItem('filters', prevFilters.current);
  //   };
  // }, []);
  const commonProps = { filters: filters, setFilters: setFilters };
  return (
    <FiltersWrapper>
      <HeaderWrapper>
        <FiltersTyp>Filters</FiltersTyp>
        <ClearTyp onClick={() => setFilters(initEmployeeFilters)}>
          Clear
        </ClearTyp>
      </HeaderWrapper>

      <Role {...commonProps} />

      <Status {...commonProps} />

      <FirstName {...commonProps} />
      <LastName {...commonProps} />
      <Email {...commonProps} />
      <Phone {...commonProps} />
    </FiltersWrapper>
  );
}
Filters.propTypes = {};

export default Filters;
