import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ConnectionModal from '../ConnectionModal';
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
import { useSocketState } from '../../Context/Socket';
import { useUserState } from '../../Context/User';
import { getLabels } from '../../api/label';
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
  CreateTemplate,
  ManageEmployee,
  ManageEmployeeAccess,
  ManageTemplates,
  ManageLabels,
} from '../../components';
import { VerifiedAccessRoute } from '../Assets';
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
const ManageTemplateWrapper = styled(Box)({
  padding: '100px 50px 0px 50px',
  background: '#E9EEF5',
  minHeight: '100vh',
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
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const labelState = useLabelState();
  const labelDispatch = useLabelDispatch();
  const leadsState = useLeadsState();
  const leadsDispatch = useLeadsDispatch();
  const companyState = useCompanyState();
  const companyDispatch = useCompanyDispatch();
  const leadSourceState = useLeadSourceState();
  const leadSourceDispatch = useLeadSourceDispatch();
  const socket = useSocketState();
  const user = useUserState();

  const commonProps = {
    setOpenModal: setOpenModal,
  };
  useEffect(() => {
    socket.emit('join-room', {
      mobileNumber: user.user.mobileNumber,
      userName: 'Amin',
    });
    socket.on('room-updates', (res) => console.log(res));
    socket.on('room-users', (res) => console.log(res));

    return () => {
      socket.off('join-room');
      socket.off('room-updates');
      socket.off('room-users');
    };
  }, []);
  useEffect(() => {
    const requests = [];
    setLoader(true);

    if (Object.entries(labelState).length < 1) {
      requests.push(
        getLabels().then((res) => {
          loadLabels(labelDispatch, { labels: res });
        })
      );
    }

    if (leadsState.length < 1) {
      requests.push(
        getLeads().then((res) => {
          loadLeads(leadsDispatch, { leads: res });
        })
      );
    }

    if (companyState.length < 1) {
      requests.push(
        getCompanies().then((res) => {
          res && loadCompanies(companyDispatch, { companies: res });
        })
      );
    }

    if (leadSourceState.length < 1) {
      requests.push(
        getLeadSource().then((res) => {
          res && loadLeadSource(leadSourceDispatch, { leadSource: res });
        })
      );
    }

    Promise.allSettled(requests).then((resArr) => {
      setLoader(false);
    });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <Router>
      <div className={classes.root}>
        <ConnectionModal openModal={openModal} setOpenModal={setOpenModal} />
        <CssBaseline />
        {open && (
          <AppBar
            {...commonProps}
            open={open}
            handleDrawerOpen={handleDrawerOpen}
          />
        )}
        <Drawer open={open} handleDrawerOpen={handleDrawerOpen} />
        <main className={classes.content}>
          {loader ? (
            <QuickSendWrapper>
              <LoaderWrapper>
                <CircularProgress color="primary" />
              </LoaderWrapper>
            </QuickSendWrapper>
          ) : (
            <Switch>
              <VerifiedAccessRoute path="/sendSms">
                <QuickSendWrapper>
                  <QuickSend {...commonProps} />
                </QuickSendWrapper>
              </VerifiedAccessRoute>
              <VerifiedAccessRoute path="/sendFromAddressBook">
                <AddressBookWrapper>
                  {' '}
                  <AddressBookTable {...commonProps} />
                </AddressBookWrapper>
              </VerifiedAccessRoute>
              <VerifiedAccessRoute path="/inbox">
                <InboxWrapper>
                  {' '}
                  <Inbox setOpen={setOpen} {...commonProps} />
                </InboxWrapper>
              </VerifiedAccessRoute>

              <VerifiedAccessRoute path="/manageContacts">
                <ContactWrapper>
                  <ManageContact {...commonProps} />
                </ContactWrapper>
              </VerifiedAccessRoute>
              <VerifiedAccessRoute path="/addContacts">
                <ContactWrapper>
                  <AddContacts />
                </ContactWrapper>
              </VerifiedAccessRoute>
              <VerifiedAccessRoute path="/addLabel">
                <QuickSendWrapper>
                  <CreateLabel />
                </QuickSendWrapper>
              </VerifiedAccessRoute>
              <VerifiedAccessRoute path="/manageLabels">
                <ManageTemplateWrapper>
                  <ManageLabels />
                </ManageTemplateWrapper>
              </VerifiedAccessRoute>

              <VerifiedAccessRoute path="/addTemplate">
                <QuickSendWrapper>
                  <CreateTemplate />
                </QuickSendWrapper>
              </VerifiedAccessRoute>
              <VerifiedAccessRoute path="/manageTemplate">
                <ManageTemplateWrapper>
                  <ManageTemplates />
                </ManageTemplateWrapper>
              </VerifiedAccessRoute>
              <VerifiedAccessRoute path="/employeesList">
                <ContactWrapper>
                  <ManageEmployee {...commonProps} />
                </ContactWrapper>
              </VerifiedAccessRoute>
              <VerifiedAccessRoute path="/manageEmployeeAccess">
                <ContactWrapper>
                  <ManageEmployeeAccess {...commonProps} />
                </ContactWrapper>
              </VerifiedAccessRoute>

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
