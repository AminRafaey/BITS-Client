import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatBox from './ChatBox';
import ChatArea from './ChatArea';
import Info from './Info';
import { Box, styled, Grid } from '@material-ui/core';

const InboxWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
});
function Inbox(props) {
  const { setOpen } = props;
  useEffect(() => {
    setOpen(false);
  }, []);
  return (
    <InboxWrapper>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <ChatBox />
        </Grid>
        <Grid item xs={7}>
          <ChatArea />
        </Grid>
        <Grid item xs={2}>
          <Info />
        </Grid>
      </Grid>
    </InboxWrapper>
  );
}

Inbox.propTypes = {};
export default Inbox;
