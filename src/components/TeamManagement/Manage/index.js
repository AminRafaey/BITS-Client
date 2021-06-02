import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FirstHeader from './FirstHeader';
import ContactsTable from './Table';
import Filters from './Filters';
import { useConnectStatusState } from '../../../Context/ConnectStatus';
import {
  useEmployeeState,
  useEmployeeDispatch,
  loadEmployee,
} from '../../../Context/Employee';
import { getEmployees } from '../../../api/Employee';
import { Grid, Box, styled, CircularProgress } from '@material-ui/core';

const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function ManageEmployee(props) {
  const { setOpenModal } = props;
  const connectState = useConnectStatusState();
  const [sortType, setSortType] = useState(2);
  const employeeState = useEmployeeState();
  const employeeDispatch = useEmployeeDispatch();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (employeeState.length === 0) {
      setLoader(true);
      getEmployees()
        .then((res) => {
          loadEmployee(employeeDispatch, { employees: res });
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
        });
    }
  }, []);

  console.log(loader);
  return (
    <React.Fragment>
      {!loader ? (
        <Box mb={6}>
          <FirstHeader sortType={sortType} setSortType={setSortType} />
          <Grid container>
            <ContactsTable sortType={sortType} />
            <Grid item xs={3}>
              <Filters />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <LoadingWrapper>
          <CircularProgress color="primary" />
        </LoadingWrapper>
      )}
    </React.Fragment>
  );
}

ManageEmployee.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};

export default ManageEmployee;
