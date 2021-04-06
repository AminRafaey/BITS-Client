import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  useLabelState,
  useLabelDispatch,
  loadLabels,
} from '../../Context/Label';
import { useLeadsState, useLeadsDispatch, loadLeads } from '../../Context/Lead';
import {
  useCompanyState,
  useCompanyDispatch,
  loadCompanies,
} from '../../Context/Company';
import {
  useLeadSourceState,
  useLeadSourceDispatch,
  loadLeadSource,
} from '../../Context/LeadSource';
import { getLabels } from '../../api/Label';
import { getLeads, getCompanies, getLeadSource } from '../../api/Lead';
import {
  Box,
  styled,
  CssBaseline,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
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
const LoaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: 50,
  minHeight: '80vh',
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
  const [labelLoader, setLabelloader] = useState(false);
  const [leadLoader, setLeadloader] = useState(false);
  const [companyLoader, setCompanyLoader] = useState(false);
  const [leadSourceLoader, setLeadSourceLoader] = useState(false);
  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();
  const leadsState = useLeadsState();
  const leadsDispatch = useLeadsDispatch();
  const companyState = useCompanyState();
  const companyDispatch = useCompanyDispatch();
  const leadSourceState = useLeadSourceState();
  const leadSourceDispatch = useLeadSourceDispatch();

  useEffect(() => {
    if (Object.entries(labelState).length < 1) {
      setLabelloader(true);
      getLabels().then((res) => {
        loadLabels(labelDispatch, { labels: res });
        setLabelloader(false);
      });
    }
  }, []);

  useEffect(() => {
    if (leadsState.length < 1) {
      setLeadloader(true);
      getLeads().then((res) => {
        loadLeads(leadsDispatch, { leads: res });
        setLeadloader(false);
      });
    }
  }, []);

  useEffect(() => {
    if (companyState.length < 1) {
      setCompanyLoader(true);
      getCompanies().then((res) => {
        loadCompanies(companyDispatch, { companies: res });
        setCompanyLoader(false);
      });
    }
  }, []);

  useEffect(() => {
    if (leadSourceState.length < 1) {
      setLeadSourceLoader(true);
      getLeadSource().then((res) => {
        loadLeadSource(leadSourceDispatch, { leadSource: res });
        setLeadSourceLoader(false);
      });
    }
  }, []);

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
          {labelLoader || leadLoader || companyLoader || leadSourceLoader ? (
            <QuickSendWrapper>
              <LoaderWrapper>
                <CircularProgress color="primary" />
              </LoaderWrapper>
            </QuickSendWrapper>
          ) : (
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
          )}
        </main>
      </div>
    </Router>
  );
}
