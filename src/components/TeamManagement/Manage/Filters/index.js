import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  FirstName,
  LastName,
  Email,
} from '../../../Contact/Manage/Filters/Filter';
import { Designation, Status, MobileNumber } from './Filter';
import {
  getFilteredEmployees,
  getDesignations,
} from '../../../../api/Employee';
import {
  useEmployeeDispatch,
  loadEmployee,
} from '../../../../Context/Employee';
import {
  useDesignationState,
  useDesignationDispatch,
  loadDesignations,
} from '../../../../Context/Designation';
import { styled, Box, Typography, CircularProgress } from '@material-ui/core';
import { LinkColor } from '../../../constants/theme';
import { initEmployeeFilters } from '../../../constants/InitialValues';

const FiltersWrapper = styled(Box)({
  padding: '16px 28px 16px 28px',
});
const HeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});
const LoaderWrapper = styled(Box)({
  height: '65vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
  const designationState = useDesignationState();
  const designationDispatch = useDesignationDispatch();
  const [loader, setLoader] = useState(false);
  const prevFilters = useRef(JSON.stringify(filters));

  useEffect(() => {
    if (designationState.length < 1) {
      setLoader(true);
      getDesignations()
        .then((res) => {
          loadDesignations(designationDispatch, { designations: res });
          setLoader(false);
        })
        .catch((err) => setLoader(false));
    }
  }, []);

  useEffect(() => {
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
      {loader ? (
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      ) : (
        <>
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
        </>
      )}
    </FiltersWrapper>
  );
}
Filters.propTypes = {};

export default Filters;
