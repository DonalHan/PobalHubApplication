import React from 'react';
import Sidebar from './Sidebar';
import MapApp from './MapApp';
import HouseList from './HouseList';
import { Box } from '@mui/material';

function Dashboard() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Box sx={{ flex: 1 }}>
        <Sidebar />
      </Box>
      <Box sx={{ display: 'flex', flex: 3, borderRadius: 2, alignItems: 'center', overflow: 'hidden', m: 2, marginTop: '6%', height: '80vh' }}>
        <MapApp />
        <HouseList />
      </Box>
    </Box>
  );
}

export default Dashboard;
