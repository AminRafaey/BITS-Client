import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { InfoAlert } from '../../../Assets';
import { Button } from '../../../HOC';
import { handleCSVChange } from '../../utility';
import { sendCSV, sendXLSX } from '../../../../api/Lead';
import { getLabels } from '../../../../api/label';
import { useLeadsDispatch, loadLeads } from '../../../../Context/Lead';
import { useLabelDispatch, loadLabels } from '../../../../Context/Label';
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
import config from '../../../../config.json';
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
  const { setError, heading, description, acceptType } = props;
  const leadsDispatch = useLeadsDispatch();
  const labelDispatch = useLabelDispatch();
  const [selectedCSV, setSelectedCSV] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const message = useRef('');
  const handleSubmit = () => {
    const data = new FormData();
    data.append('excelFile', selectedCSV);
    if (!selectedCSV) {
      setError('No CSV is selected. Please select one to continue');
      return undefined;
    }
    if (acceptType.replace('.', '') === 'csv') {
      setLoading(true);
      sendCSV(data)
        .then((res) => {
          getLabels().then((innerResponse) => {
            loadLabels(labelDispatch, { labels: innerResponse });
            loadLeads(leadsDispatch, {
              leads: res.data,
            });
            message.current = res.message;
            setSelectedCSV(null);
            setLoading(false);
            setOpenInfoAlert(true);
          });
        })
        .catch((err) => {
          message.current = err;
          setSelectedCSV(null);
          setLoading(false);
          setOpenInfoAlert(true);
        });
    } else if (acceptType.replace('.', '') === 'xlsx') {
      setLoading(true);
      sendXLSX(data)
        .then((res) => {
          getLabels().then((innerResponse) => {
            loadLabels(labelDispatch, { labels: innerResponse });
            loadLeads(leadsDispatch, {
              leads: res.data,
            });
            message.current = res.message;
            setSelectedCSV(null);
            setLoading(false);
            setOpenInfoAlert(true);
          });
        })
        .catch((err) => {
          message.current = err;
          setSelectedCSV(null);
          setLoading(false);
          setOpenInfoAlert(true);
        });
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
            id={acceptType}
            onChange={(e) =>
              handleCSVChange(
                e,
                setSelectedCSV,
                setError,
                acceptType.replace('.', ''),
                1000
              )
            }
            onClick={(e) => (e.target.value = null)}
            style={{ display: 'none' }}
            accept={acceptType}
          />
          <label
            htmlFor={acceptType}
            style={{ color: 'white', cursor: 'pointer' }}
          >
            <Button
              size="small"
              variant="contained"
              color="default"
              startIcon={<CloudUploadIcon />}
              style={{ pointerEvents: 'none' }}
            >
              Upload {acceptType.replace('.', '').toUpperCase()} File
            </Button>
          </label>
          <FileNameTyp>
            {selectedCSV ? selectedCSV.name : 'No File Choosen'}
          </FileNameTyp>
        </ButtonWrapper>
      </StyledCardContent>
      <CardActions>
        <CardActionsInnerWrapper {...(loading && { mr: 2 })}>
          <a
            href={
              acceptType.replace('.', '') === 'csv'
                ? `${config.baseUrl}lead/downloadCSVSample`
                : acceptType.replace('.', '') === 'xlsx'
                ? `${config.baseUrl}lead/downloadXLSXSample`
                : ''
            }
            style={{ textDecoration: 'none' }}
          >
            <DownloadTyp>Download Sample</DownloadTyp>
          </a>
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
      <InfoAlert
        open={openInfoAlert}
        setOpen={setOpenInfoAlert}
        title={`${acceptType.replace('.', '').toUpperCase()} Upload Status`}
        message={message.current}
      />
    </Card>
  );
}

ImportCard.propTypes = {
  setError: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  acceptType: PropTypes.string.isRequired,
};
export default ImportCard;
