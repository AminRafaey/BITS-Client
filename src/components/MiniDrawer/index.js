import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box, styled, CssBaseline, makeStyles } from '@material-ui/core';
import { AddressBookTable, Home, QuickSend } from '../../components';
import AppBar from './AppBar';
import Drawer from './Drawer';

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
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <Drawer open={open} handleDrawerClose={handleDrawerClose} />
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            <Route path="/sendSms">
              <QuickSendWrapper>
                <QuickSend />
              </QuickSendWrapper>
            </Route>
            <Route path="/sendFromAddressBook">
              <AddressBookWrapper>
                {' '}
                <AddressBookTable />
              </AddressBookWrapper>
            </Route>
            <Route path="/">
              <HomePageWrapper>
                <Home />
              </HomePageWrapper>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
