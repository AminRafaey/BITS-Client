import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { MiniDrawer } from './components';
import { Inbox } from './components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Inbox />
    </ThemeProvider>
  );
}

export default App;
