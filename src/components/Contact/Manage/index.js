import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FirstHeader from './FirstHeader';
import ContactsTable from './Table';
import Filters from './Filters';
import { Grid, Box } from '@material-ui/core';
function ManageContact(props) {
  const [sortType, setSortType] = useState(2);
  return (
    <Box mb={6}>
      <FirstHeader sortType={sortType} setSortType={setSortType} />
      <Grid container>
        <ContactsTable sortType={sortType} />
        <Grid item xs={3}>
          <Filters />
        </Grid>
      </Grid>
    </Box>
  );
}

ManageContact.propTypes = {};

export default ManageContact;
