import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../HOC';
import { handleCSVChange } from '../../utility';
import { sendCSV } from '../../../../api/Lead';
import {
  Card,
  CardActions,
  CardContent,
  withStyles,
  styled,
  Box,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { GrayColor, LinkColor } from '../../../constants/theme';

const TitleTyp = styled(Typography)({
  fontSize: 14,
  background: GrayColor,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 16,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
});
const ContentTyp = styled(Typography)({
  fontSize: 14,
  padding: '24px 0px 8px 16px',
});
const ButtonWrapper = styled(Box)({
  padding: '8px 0px 4px 16px',
  display: 'flex',
});
const DownloadTyp = styled(Typography)({
  color: LinkColor,
  fontSize: 14,
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});
export const FileNameTyp = styled(Typography)({
  fontSize: 14,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingLeft: 10,
  display: 'flex',
  alignItems: 'center',
});
const CardActionsInnerWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 8px 4px 8px',
});
const StyledCardContent = withStyles({
  root: {
    padding: 0,
  },
})(CardContent);

function ImportCard(props) {
  const { setError, heading, description, type } = props;
  const [selectedCSV, setSelectedCSV] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const data = new FormData();
    data.append('excelFile', selectedCSV);
    if (!selectedCSV) {
      setError('No CSV is selected. Please select one to continue');
      return undefined;
    }
    if (type === 'leads') {
      sendCSV(data).then((res) => {});
    } else if (type === 'labels') {
    }
  };
  return (
    <Card style={{ maxWidth: '90%' }} variant="outlined">
      <StyledCardContent>
        <TitleTyp>{heading}</TitleTyp>

        <ContentTyp color="textSecondary">{description}</ContentTyp>
        <ButtonWrapper>
          <input
            name="file"
            type="file"
            id="csv"
            onChange={(e) =>
              handleCSVChange(e, setSelectedCSV, setError, 'csv', 1000)
            }
            style={{ display: 'none' }}
            accept={
              '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
            }
          />
          <Button
            size="small"
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
          >
            <label htmlFor="csv" style={{ color: 'white', cursor: 'pointer' }}>
              Upload CSV File
            </label>
          </Button>
          <FileNameTyp>
            {selectedCSV ? selectedCSV.name : 'No File Choosen'}
          </FileNameTyp>
        </ButtonWrapper>
      </StyledCardContent>
      <CardActions>
        <CardActionsInnerWrapper {...(loading && { mr: 2 })}>
          <DownloadTyp>Download Sample</DownloadTyp>
          {loading ? (
            <CircularProgress size={26} color="primary" />
          ) : (
            <Button
              size="small"
              variant="contained"
              color="default"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          )}
        </CardActionsInnerWrapper>
      </CardActions>
    </Card>
  );
}

ImportCard.propTypes = {
  setError: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
export default ImportCard;
