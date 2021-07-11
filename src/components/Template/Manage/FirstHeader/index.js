import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../../../HOC';
import { useUserState } from '../../../../Context/User';
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
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { DelieverStatusColor, BackgroundColor } from '../../../constants/theme';
import config from '../../../../config.json';

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
  const userState = useUserState();

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
        <Link to={'/addTemplate'} style={{ textDecoration: 'none' }}>
          <Button startIcon={<AddCircleIcon />}>Add Template</Button>
        </Link>

        <Box pl={1}>
          <a
            href={`${config.baseUrl}template/exportTemplates?token=${userState.token}`}
            style={{ textDecoration: 'none' }}
          >
            <Button startIcon={<CloudDownloadIcon />}>Export Templates</Button>
          </a>
        </Box>
      </Box>
    </FirstHeaderWrapper>
  );
}

FirstHeader.propTypes = {
  sortType: PropTypes.number.isRequired,
  setSortType: PropTypes.func.isRequired,
};
export default FirstHeader;
