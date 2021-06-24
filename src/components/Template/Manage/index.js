import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FirstHeader from './FirstHeader';
import ContactsTable from './Table';
import { Box, styled, CircularProgress } from '@material-ui/core';

const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function ManageTemplates(props) {
  const [sortType, setSortType] = useState(2);
  const [loading, setLoading] = useState(2);

  return (
    <React.Fragment>
      {loading ? (
        <Box mb={6}>
          <FirstHeader sortType={sortType} setSortType={setSortType} />
          <ContactsTable sortType={sortType} />
        </Box>
      ) : (
        <LoadingWrapper>
          <CircularProgress color="primary" />
        </LoadingWrapper>
      )}
    </React.Fragment>
  );
}

ManageTemplates.propTypes = {};

export default ManageTemplates;
