import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { MiniDrawer } from './components';
import { ConnectStatusProvider } from './Context/ConnectStatus';
import { TemplateProvider } from './Context/Template';
import { AddressBookProvider } from './Context/AddressBook';
import { ChatProvider } from './Context/Chat';
import { SocketProvider } from './Context/Socket';
import { chat } from './Static/Chat';
import { addressBook } from './Static/AddressBook';
import { LabelProvider } from './Context/Label';
import { LeadsProvider } from './Context/Lead';
import { leads } from './Static/Lead';
import { LabelProvider as LabelProviderRevamp } from './Context/LabelRevamp';
import { labels as labelsRevamp } from './Static/LabelRevamp';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <ConnectStatusProvider>
          <TemplateProvider template={[]}>
            <LeadsProvider leads={leads}>
              <AddressBookProvider addressBook={addressBook}>
                <ChatProvider chat={chat}>
                  <LabelProvider>
                    <LabelProviderRevamp label={labelsRevamp}>
                      <MiniDrawer />
                    </LabelProviderRevamp>
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
