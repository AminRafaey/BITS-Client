import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { InfoAlert, CircularProgressWithLabel } from '../../../Assets';
import { Button } from '../../../HOC';
import { useLeadsDispatch, loadLeads } from '../../../../Context/Lead';
import { useSocketState } from '../../../../Context/Socket';
import { useUserState } from '../../../../Context/User';
import { useConnectStatusState } from '../../../../Context/ConnectStatus';
import { toastActions } from '../../../Toast';
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
import { GrayColor } from '../../../constants/theme';

const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
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

function WhatsappImportCard(props) {
  const { heading, description, setOpenModal } = props;
  const connectState = useConnectStatusState();
  const socket = useSocketState();
  const user = useUserState();
  const leadsDispatch = useLeadsDispatch();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openInfoAlert, setOpenInfoAlert] = useState(false);
  const message = useRef('');
  useEffect(() => {
    connectState && getProgress();
    !connectState && setOpenModal(true);
    socket.on('import-start', (res) => {
      toastActions['success'](res.message);
      getProgress();
    });
  }, [connectState]);

  const handleImportBtnClick = () => {
    setLoading(true);
    getProgress();
    socket.emit(
      'import-contacts-from-whatsApp',
      { adminId: user.user.adminId },
      {},
      (response) => {
        toastActions[response.status](response.message);
        setLoading(false);
        response.status === 'success' &&
          loadLeads(leadsDispatch, {
            leads: response.data,
          });
      }
    );
  };

  const getProgress = () => {
    socket.emit('get-Import-Contacts-Status', {}, {}, (response) => {
      if (response) {
        if (response.status == 'complete') {
          setProgress(
            (response.data.savedContacts / response.data.totalContacts) * 100
          );
          !loading && setLoading(true);
          setTimeout(() => getProgress(), 1000);
        } else {
          setProgress(100);
          loading && setLoading(false);
        }
      }
    });
  };

  return (
    <Card style={{ maxWidth: '90%' }} variant="outlined">
      {connectState ? (
        <React.Fragment>
          <StyledCardContent>
            <TitleTyp>{heading}</TitleTyp>
            <ContentTyp color="textSecondary">{description}</ContentTyp>
          </StyledCardContent>
          <CardActions>
            <CardActionsInnerWrapper {...(loading && { mr: 2 })}>
              {loading ? (
                <CircularProgressWithLabel color="primary" value={progress} />
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="default"
                  onClick={() => handleImportBtnClick()}
                >
                  Import
                </Button>
              )}
            </CardActionsInnerWrapper>
          </CardActions>
          <InfoAlert
            open={openInfoAlert}
            setOpen={setOpenInfoAlert}
            title={'CSV Upload Status'}
            message={message.current}
          />
        </React.Fragment>
      ) : (
        <LoadingWrapper>
          <CircularProgress color="primary" />
        </LoadingWrapper>
      )}
    </Card>
  );
}

WhatsappImportCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
export default WhatsappImportCard;
