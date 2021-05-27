import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddLabel from '../../../Forms/Label/Add';
import DeleteAlert from '../DeleteAlert';
import { Button, Checkbox } from '../../../HOC';
import { styled, Box, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { DarkBackgroundColor, HeadingColor } from '../../../constants/theme';

const SecondHeaderWrapper = styled(Box)({
  display: 'flex',
  padding: '8px 4px',
  background: DarkBackgroundColor,
});

const ButtonsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});
const SelectedLeadTyp = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  padding: '0px 12px',
  color: HeadingColor,
});

function SecondHeader(props) {
  const { handleSelectAllClick, selectedCount } = props;
  return (
    <SecondHeaderWrapper>
      <Checkbox onChange={handleSelectAllClick} />
      <SelectedLeadTyp>{selectedCount + ' Selected'}</SelectedLeadTyp>
      <ButtonsWrapper>
        <Box pl={1}>
          <Button>Send Email</Button>
        </Box>
        <Box pl={1}>
          <Link
            to={'/sendFromAddressBook'}
            style={{
              textDecoration: 'none',
              width: '100%',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            <Button disabled={selectedCount === 0}>Send WhatsApp</Button>
          </Link>
        </Box>
      </ButtonsWrapper>
    </SecondHeaderWrapper>
  );
}

SecondHeader.propTypes = {
  handleSelectAllClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number.isRequired,
};
export default SecondHeader;
