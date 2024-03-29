import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBox from './ChatBox';
import ChatArea from './ChatArea';
import Info from './Info';
import WABg from '../../public/images/WABg.png';
import { useConnectStatusState } from '../../Context/ConnectStatus';
import { Box, styled, Grid, CircularProgress } from '@material-ui/core';

const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const InboxWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
});
function Inbox(props) {
  const { setOpenModal, setOpen } = props;
  const [currentChatJid, setCurrentChatJid] = useState('');
  const connectState = useConnectStatusState();

  useEffect(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    !connectState && setOpenModal(true);
  }, [connectState]);

  return (
    <InboxWrapper>
      {connectState ? (
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <ChatBox setCurrentChatJid={setCurrentChatJid} />
          </Grid>
          {currentChatJid ? (
            <React.Fragment>
              <Grid
                item
                xs={currentChatJid.split('@')[1] === 's.whatsapp.net' ? 7 : 9}
              >
                <ChatArea currentChatJid={currentChatJid} />
              </Grid>
              {currentChatJid.split('@')[1] === 's.whatsapp.net' && (
                <Grid item xs={2}>
                  <Info currentChatJid={currentChatJid} />
                </Grid>
              )}
            </React.Fragment>
          ) : (
            <Grid item xs={9}>
              {' '}
              <img src={WABg} style={{ width: '100%', height: '100%' }} />{' '}
            </Grid>
          )}
        </Grid>
      ) : (
        <LoadingWrapper>
          <CircularProgress color="primary" />
        </LoadingWrapper>
      )}
    </InboxWrapper>
  );
}

Inbox.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};
export default Inbox;
