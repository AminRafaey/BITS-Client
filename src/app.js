import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { MiniDrawer } from './components';
import { ConnectStatusProvider } from './Context/ConnectStatus';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConnectStatusProvider>
        <MiniDrawer />
      </ConnectStatusProvider>
    </ThemeProvider>
  );
}

export default App;
