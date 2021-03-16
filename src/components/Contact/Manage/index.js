import React from 'react';
import PropTypes from 'prop-types';
import FirstHeader from './FirstHeader';
import SecondHeader from './SecondHeader';
import ContactsTable from './Table';
import Filters from './Filters';
import { Grid } from '@material-ui/core';
function ManageContact(props) {
  return (
    <div>
      <FirstHeader />
      <SecondHeader />
      <Grid container>
        <Grid item xs={9}>
          <ContactsTable />
        </Grid>
        <Grid item xs={3}>
          <Filters />
        </Grid>
      </Grid>
    </div>
  );
}

ManageContact.propTypes = {};

export default ManageContact;
