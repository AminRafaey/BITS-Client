import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FirstHeader from './FirstHeader';
import ContactsTable from './Table';
import { Box } from '@material-ui/core';

function ManageLabels(props) {
  const [sortType, setSortType] = useState(2);

  return (
    <Box mb={6}>
      <FirstHeader sortType={sortType} setSortType={setSortType} />
      <ContactsTable sortType={sortType} />
    </Box>
  );
}

ManageLabels.propTypes = {};

export default ManageLabels;
