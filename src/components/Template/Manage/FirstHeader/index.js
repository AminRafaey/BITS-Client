import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../../../HOC';
import { useTemplateState } from '../../../../Context/Template';
import {
  styled,
  Box,
  Typography,
  withStyles,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { DelieverStatusColor, BackgroundColor } from '../../../constants/theme';

const ContactInfoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'baseline',
});
const FirstHeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 0px 24px 0px',
});
const SortAreaWrapper = styled(Box)({
  display: 'flex',
});
const ContactTyp = styled(Typography)({
  fontSize: 24,
  display: 'inline',
});
const CreatedDateTyp = styled(Typography)({
  fontSize: 14,
  paddingLeft: 12,
  paddingRight: 3,
});

const ContactNumTyp = styled(Typography)({
  fontSize: 14,
  fontFamily: 'medium',
  display: 'inline',
  paddingLeft: 14,
  color: DelieverStatusColor,
});

const StyledFormControl = withStyles({
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: BackgroundColor,
    },
    '& .MuiSelect-select:focus': {
      background: BackgroundColor,
    },
  },
})(FormControl);
function FirstHeader(props) {
  const { sortType, setSortType } = props;
  const templateState = useTemplateState();

  return (
    <FirstHeaderWrapper>
      <ContactInfoWrapper>
        <ContactTyp>Templates</ContactTyp>
        <ContactNumTyp>{templateState.length} Total</ContactNumTyp>
        <SortAreaWrapper>
          <ContactNumTyp>Sort by:</ContactNumTyp>
          <CreatedDateTyp>
            <em>Created Date</em>
          </CreatedDateTyp>
        </SortAreaWrapper>
        <StyledFormControl>
          <Select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            variant="outlined"
          >
            <MenuItem value={1}>Ascending</MenuItem>
            <MenuItem value={2}>Descending</MenuItem>
          </Select>
        </StyledFormControl>
      </ContactInfoWrapper>

      <Box display="inline-flex" alignItems="center">
        <Link
          to={'/addContacts'}
          style={{ textDecoration: 'none', width: '100%' }}
        >
          <Button startIcon={<AddCircleIcon />}>Add Template</Button>
        </Link>
      </Box>
    </FirstHeaderWrapper>
  );
}

FirstHeader.propTypes = {
  sortType: PropTypes.number.isRequired,
  setSortType: PropTypes.func.isRequired,
};
export default FirstHeader;
