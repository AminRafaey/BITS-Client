import React from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { theme } from './theme';
import { MiniDrawer } from './components';
import Toast from './components/Toast';
import { ConnectStatusProvider } from './Context/ConnectStatus';
import { TemplateProvider } from './Context/Template';
import { ChatProvider } from './Context/Chat';
import { SocketProvider } from './Context/Socket';
import { chat } from './Static/Chat';
import { LeadsProvider } from './Context/Lead';
import { leads } from './Static/Lead';
import { LabelProvider } from './Context/Label';
import { labels } from './Static/Label';
import { companies } from './Static/Company';
import { leadSource } from './Static/LeadSource';
import { employee } from './Static/Employee';
import { CompanyProvider } from './Context/Company';
import { LeadSourceProvider } from './Context/LeadSource';
import { EmployeeProvider } from './Context/Employee';
import { DesignationProvider } from './Context/Designation';
import { UserProvider } from './Context/User';
import { SignIn } from './components';
import { PrivateRoute } from './components/Assets';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <UserProvider>
          <ConnectStatusProvider connectStatus={true}>
            <TemplateProvider>
              <LeadsProvider>
                <ChatProvider chat={chat}>
                  <LabelProvider>
                    <CompanyProvider>
                      <LeadSourceProvider>
                        <EmployeeProvider>
                          <DesignationProvider>
                            <SnackbarProvider
                              maxSnack={3}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                              }}
                            >
                              <Toast />
                              <Router>
                                <Switch>
                                  <Route path="/signIn">
                                    <SignIn />
                                  </Route>
                                  <PrivateRoute path="/" userType={'Employee'}>
                                    <MiniDrawer />
                                  </PrivateRoute>
                                </Switch>
                              </Router>
                            </SnackbarProvider>
                          </DesignationProvider>
                        </EmployeeProvider>
                      </LeadSourceProvider>
                    </CompanyProvider>
                  </LabelProvider>
                </ChatProvider>
              </LeadsProvider>
            </TemplateProvider>
          </ConnectStatusProvider>
        </UserProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
