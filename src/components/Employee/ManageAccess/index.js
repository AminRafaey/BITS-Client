import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FirstHeader from './FirstHeader';
import AccessTable from './Table';
import {
  useEmployeeState,
  useEmployeeDispatch,
  loadEmployee,
} from '../../../Context/Employee';
import { getEmployees } from '../../../api/Employee';
import { Box, styled, CircularProgress } from '@material-ui/core';

const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function ManageEmployeeAccess(props) {
  const {} = props;

  const employeeState = useEmployeeState();
  const employeeDispatch = useEmployeeDispatch();
  const [loader, setLoader] = useState(false);
  const employeeStateRef = useRef(employeeState);

  useEffect(() => {
    if (employeeState.length === 0) {
      setLoader(true);
      getEmployees()
        .then((res) => {
          loadEmployee(employeeDispatch, { employees: res });
          employeeStateRef.current = res;
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    }
  }, []);

  return (
    <React.Fragment>
      {!loader ? (
        <Box mb={6}>
          <FirstHeader />
          <AccessTable employeeStateRef={employeeStateRef} />
        </Box>
      ) : (
        <LoadingWrapper>
          <CircularProgress color="primary" />
        </LoadingWrapper>
      )}
    </React.Fragment>
  );
}

ManageEmployeeAccess.propTypes = {};

export default ManageEmployeeAccess;
