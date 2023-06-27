import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from './theme';
import Dashboard from './HomePage/Dashboard';




function App() {
  const theme = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  )
}

export default App;
