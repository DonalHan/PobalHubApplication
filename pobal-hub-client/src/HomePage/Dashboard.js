import React from 'react';
import Sidebar from './Sidebar';
import MapApp from './MapApp';
import HouseList from './HouseList';
import { Box } from '@mui/material';
function Dashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      <div style={{ flex: '1' }}>
        <Sidebar />
      </div>

      
        <Box flex = '3' display = "flex"  borderRadius= "10px" alignItems={"center"} overflow={"hidden"}>
          <MapApp/>
          <HouseList/>
        </Box> 
 
     
    </div>
  );
  }
  export default Dashboard;