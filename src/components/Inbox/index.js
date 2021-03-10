import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBox from './ChatBox';
import ChatArea from './ChatArea';
import Info from './Info';
import WABg from '../../public/images/WABg.png';
import { Box, styled, Grid } from '@material-ui/core';

const InboxWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
});
function Inbox(props) {
  const { setOpen } = props;
  const [currentChatJid, setCurrentChatJid] = useState('');

  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <InboxWrapper>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <ChatBox setCurrentChatJid={setCurrentChatJid} />
        </Grid>
        {currentChatJid ? (
          <React.Fragment>
            <Grid item xs={7}>
              <ChatArea currentChatJid={currentChatJid} />
            </Grid>
            <Grid item xs={2}>
              <Info />
            </Grid>
          </React.Fragment>
        ) : (
          <Grid item xs={9}>
            {' '}
            <img src={WABg} style={{ width: '100%', height: '100%' }} />{' '}
          </Grid>
        )}
      </Grid>
    </InboxWrapper>
  );
}

Inbox.propTypes = {
  setOpen: PropTypes.func.isRequired,
};
export default Inbox;
