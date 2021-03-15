import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../HOC';
import { styled, Box, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { DelieverStatusColor } from '../../../constants/theme';

const FirstHeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 16px 24px 16px',
});

const ContactTyp = styled(Typography)({
  fontSize: 24,
  display: 'inline',
});

const ContactNumTyp = styled(Typography)({
  fontSize: 14,
  fontFamily: 'medium',
  display: 'inline',
  paddingLeft: 14,
  color: DelieverStatusColor,
});

function FirstHeader(props) {
  return (
    <FirstHeaderWrapper>
      <Box>
        <ContactTyp>Contacts</ContactTyp>
        <ContactNumTyp>2 Total</ContactNumTyp>
      </Box>
      <Box display="inline-flex" alignItems="center">
        <Button startIcon={<AddCircleIcon />}>Add Contact</Button>
        <Box pl={1}>
          <Button>Import Contact</Button>
        </Box>
      </Box>
    </FirstHeaderWrapper>
  );
}

FirstHeader.propTypes = {};
export default FirstHeader;
