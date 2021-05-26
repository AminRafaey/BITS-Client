import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FirstHeader from './FirstHeader';
import ContactsTable from './Table';
import Filters from './Filters';
import { useConnectStatusState } from '../../../Context/ConnectStatus';
import { Grid, Box, styled, CircularProgress } from '@material-ui/core';

const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function ManageContact(props) {
  const { setOpenModal } = props;
  const connectState = useConnectStatusState();
  const [sortType, setSortType] = useState(2);

  useEffect(() => {
    !connectState && setOpenModal(true);
  }, [connectState]);
  return (
    <React.Fragment>
      {connectState ? (
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

ManageContact.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};

export default ManageContact;
