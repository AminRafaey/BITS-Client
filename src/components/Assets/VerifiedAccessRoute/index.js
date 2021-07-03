import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { useUserState } from '../../../Context/User';
import { Alert } from '../../HOC';
import { styled, Box } from '@material-ui/core';

const AlertWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

const accessRules = {
  employeesList: {
    type: 'Admin',
  },
  manageEmployeeAccess: {
    type: 'Admin',
  },
  sendSms: {
    quickSend: 'allow',
  },
  sendFromAddressBook: {
    quickSend: 'allow',
  },
  manageContacts: {
    contactManagement: 'allow',
  },
  addContacts: {
    contactManagement: 'allow',
  },
  addLabel: {
    labelManagement: 'allow',
  },
  manageLabels: {
    labelManagement: 'allow',
  },
  addTemplate: {
    templateManagement: 'allow',
  },
  manageTemplate: {
    templateManagement: 'allow',
  },
  inbox: {
    inbox: 'allow',
  },
};

export default function VerifiedAccessRoute({ children, userType, ...rest }) {
  const userState = useUserState();
  const location = useLocation();
  const path = location.pathname.replace('/', '');

  return (
    <Route
      {...rest}
      render={() =>
        accessRules[path][Object.keys(accessRules[path])[0]] ===
          userState['user'][Object.keys(accessRules[path])[0]] ||
        userState['user']['type'] === 'Admin' ? (
          children
        ) : (
          <AlertWrapper>
            <Alert severity="warning">
              You are not authoried to visit this page, Please contact admin to
              know more about your access...
            </Alert>
          </AlertWrapper>
        )
      }
    />
  );
}
