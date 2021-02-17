import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { MiniDrawer } from './components';
import { ConnectStatusProvider } from './Context/ConnectStatus';
import { TemplateProvider } from './Context/Template';
import { AddressBookProvider } from './Context/AddressBook';
import { addressBook } from './Static/AddressBook';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConnectStatusProvider>
        <TemplateProvider template={[]}>
          <AddressBookProvider addressBook={addressBook}>
            <MiniDrawer />
          </AddressBookProvider>
        </TemplateProvider>
      </ConnectStatusProvider>
    </ThemeProvider>
  );
}

export default App;
