import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from '../../../HOC';
import { styled, Box, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  DelieverStatusColor,
  DarkBackgroundColor,
} from '../../../constants/theme';

const SecondHeaderWrapper = styled(Box)({
  display: 'flex',
  padding: '8px 4px',
  background: DarkBackgroundColor,
});

const ButtonsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

function SecondHeader(props) {
  return (
    <SecondHeaderWrapper>
      <Checkbox />
      <ButtonsWrapper>
        <Button>Add Label</Button>
        <Box pl={1}>
          <Button>Remove Label</Button>
        </Box>
        <Box pl={1}>
          <Button>Send Email</Button>
        </Box>
        <Box pl={1}>
          <Button>Send WhatsApp</Button>
        </Box>
        <Box pl={1}>
          <Button startIcon={<DeleteIcon />}>Delete</Button>
        </Box>
      </ButtonsWrapper>
    </SecondHeaderWrapper>
  );
}

SecondHeader.propTypes = {};
export default SecondHeader;
