import React from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { MiniDrawer } from './components';
import Toast from './components/Toast';
import { ConnectStatusProvider } from './Context/ConnectStatus';
import { TemplateProvider } from './Context/Template';
import { AddressBookProvider } from './Context/AddressBook';
import { ChatProvider } from './Context/Chat';
import { SocketProvider } from './Context/Socket';
import { chat } from './Static/Chat';
import { addressBook } from './Static/AddressBook';
import { LeadsProvider } from './Context/Lead';
import { leads } from './Static/Lead';
import { LabelProvider } from './Context/Label';
import { labels } from './Static/Label';
import { companies } from './Static/Company';
import { leadSource } from './Static/LeadSource';
import { CompanyProvider } from './Context/Company';
import { LeadSourceProvider } from './Context/LeadSource';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <ConnectStatusProvider>
          <TemplateProvider template={[]}>
            <LeadsProvider>
              <AddressBookProvider addressBook={addressBook}>
                <ChatProvider chat={chat}>
                  <LabelProvider>
                    <CompanyProvider companies={companies}>
                      <LeadSourceProvider leadSource={leadSource}>
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
                      </LeadSourceProvider>
                    </CompanyProvider>
                  </LabelProvider>
                </ChatProvider>
              </AddressBookProvider>
            </LeadsProvider>
          </TemplateProvider>
        </ConnectStatusProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
