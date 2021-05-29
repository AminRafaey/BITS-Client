import React from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <ConnectStatusProvider>
          <TemplateProvider>
            <LeadsProvider>
              <ChatProvider>
                <LabelProvider>
                  <CompanyProvider>
                    <LeadSourceProvider>
                      <EmployeeProvider employee={employee}>
                        <SnackbarProvider
                          maxSnack={3}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                        >
                          <Toast />
                          <MiniDrawer />
                        </SnackbarProvider>
                      </EmployeeProvider>
                    </LeadSourceProvider>
                  </CompanyProvider>
                </LabelProvider>
              </ChatProvider>
            </LeadsProvider>
          </TemplateProvider>
        </ConnectStatusProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
