import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Box, styled, CssBaseline, makeStyles } from '@material-ui/core';
import {
  AddressBookTable,
  Home,
  QuickSend,
  Inbox,
  ManageContact,
  AddContacts,
  CreateLabel,
} from '../../components';
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
const InboxWrapper = styled(Box)({
  padding: '0px 0px 0px 0px',
  height: '100%',
  width: '100%',
});
const ContactWrapper = styled(Box)({
  padding: '75px 0px 0px 0px',
  background: '#E9EEF5',
  height: '100%',
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

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        {open && <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />}
        <Drawer open={open} handleDrawerOpen={handleDrawerOpen} />
        <main className={classes.content}>
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
            <Route path="/inbox">
              <InboxWrapper>
                {' '}
                <Inbox setOpen={setOpen} />
              </InboxWrapper>
            </Route>

            <Route path="/manageContacts">
              <ContactWrapper>
                <ManageContact />
              </ContactWrapper>
            </Route>
            <Route path="/addContacts">
              <ContactWrapper>
                <AddContacts />
              </ContactWrapper>
            </Route>
            <Route path="/addLabel">
              <QuickSendWrapper>
                <CreateLabel />
              </QuickSendWrapper>
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
