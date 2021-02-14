import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { MiniDrawer } from './components';
import { ConnectStatusProvider } from './Context/ConnectStatus';
import { TemplateProvider } from './Context/Template';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConnectStatusProvider>
        <TemplateProvider template={[]}>
          <MiniDrawer />
        </TemplateProvider>
      </ConnectStatusProvider>
    </ThemeProvider>
  );
}

export default App;
