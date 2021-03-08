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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SocketProvider>
        <ConnectStatusProvider>
          <TemplateProvider template={[]}>
            <AddressBookProvider addressBook={addressBook}>
              <ChatProvider chat={chat}>
                <MiniDrawer />
              </ChatProvider>
            </AddressBookProvider>
          </TemplateProvider>
        </ConnectStatusProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
