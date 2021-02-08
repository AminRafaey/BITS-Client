import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { MiniDrawer } from './components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MiniDrawer />
    </ThemeProvider>
  );
}

export default App;
