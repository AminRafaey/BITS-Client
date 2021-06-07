import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  FirstName,
  LastName,
  Email,
} from '../../../Contact/Manage/Filters/Filter';
import { Designation, Status, MobileNumber } from './Filter';
import { getFilteredEmployees } from '../../../../api/Employee';
import {
  useEmployeeDispatch,
  loadEmployee,
} from '../../../../Context/Employee';
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
  const employeeDispatch = useEmployeeDispatch();
  const prevFilters = useRef(JSON.stringify(filters));

  useEffect(() => {
    console.log(filters);
    if (prevFilters.current !== JSON.stringify(filters)) {
      getFilteredEmployees(filters).then(
        (res) => res && loadEmployee(employeeDispatch, { employees: res })
      );
      prevFilters.current = JSON.stringify(filters);
    }
  }, [filters]);

  useEffect(() => {
    if (localStorage.getItem('employeeFilters')) {
      prevFilters.current = localStorage.getItem('employeeFilters');
      setFilters(JSON.parse(localStorage.getItem('employeeFilters')));
    }
    return () => {
      localStorage.setItem('employeeFilters', prevFilters.current);
    };
  }, []);
  const commonProps = { filters: filters, setFilters: setFilters };
  return (
    <FiltersWrapper>
      <HeaderWrapper>
        <FiltersTyp>Filters</FiltersTyp>
        <ClearTyp onClick={() => setFilters(initEmployeeFilters)}>
          Clear
        </ClearTyp>
      </HeaderWrapper>

      <Designation {...commonProps} />

      <Status {...commonProps} />

      <FirstName {...commonProps} />
      <LastName {...commonProps} />
      <Email {...commonProps} />
      <MobileNumber {...commonProps} />
    </FiltersWrapper>
  );
}
Filters.propTypes = {};

export default Filters;
