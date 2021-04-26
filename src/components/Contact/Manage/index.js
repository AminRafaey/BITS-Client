import React from 'react';
import PropTypes from 'prop-types';
import FirstHeader from './FirstHeader';
import ContactsTable from './Table';
import Filters from './Filters';
import { Grid, Box } from '@material-ui/core';
function ManageContact(props) {
  return (
    <Box mb={6}>
      <FirstHeader />
      <Grid container>
        <ContactsTable />
        <Grid item xs={3}>
          <Filters />
        </Grid>
      </Grid>
    </Box>
  );
}

ManageContact.propTypes = {};

export default ManageContact;
