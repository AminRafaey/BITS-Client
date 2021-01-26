import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { MiniDrawer } from './components';
import Menu from './components/MiniDrawer/Menu';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MiniDrawer />
    </ThemeProvider>
  );
}

export default App;
