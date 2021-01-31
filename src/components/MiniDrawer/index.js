import React, { useState } from 'react';
import { Box, styled, CssBaseline, makeStyles } from '@material-ui/core';

import { AddressBookTable } from '../../components';
import AppBar from './AppBar';
import Drawer from './Drawer';
const drawerWidth = 280;
const AddressBookWrapper = styled(Box)({
  padding: '100px 50px 0px 50px',
  background: '#E9EEF5',
  height: '100%',
});
const HomePageWrapper = styled(Box)({
  padding: '260px 50px 0px 50px',
  background: '#E9EEF5',
  height: '100%',
});
const QuickSendWrapper = styled(Box)({
  padding: '100px 50px 0px 50px',
  background: '#E9EEF5',
  minHeight: '150vh',
});
const ImageWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    padding: theme.spacing(0, 1),
  },
  content: {
    width: '100%',
    minHeight: '100vh',
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer open={open} handleDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          //   <HomePageWrapper>
          //   <Home />
          // </HomePageWrapper>
        }
        {
          //   <QuickSendWrapper>
          //   <QuickSend />
          // </QuickSendWrapper>
        }
        <AddressBookWrapper>
          {' '}
          <AddressBookTable />
        </AddressBookWrapper>
      </main>
    </div>
  );
}
