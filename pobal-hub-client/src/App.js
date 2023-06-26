import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from './theme';
import Sidebar from './HomePage/sidebar';

function App() {
  const theme = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar />
    </ThemeProvider>

  )
  
}

export default App;
