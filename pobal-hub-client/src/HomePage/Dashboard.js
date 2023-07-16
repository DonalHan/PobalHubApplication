import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MapApp from './MapApp';
import HouseList from './HouseList';
import { Box } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    console.log('useEffect running');
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/properties');
        console.log(response.data);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties', error);
        console.log('Error details:', error.response);
      }
    }
    fetchData();
  }, []);

  
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Box sx={{ flex: 1 }}>
        <Sidebar />
      </Box>
      <Box sx={{ display: 'flex', flex: 3, borderRadius: 2, alignItems: 'center', overflow: 'hidden', m: 2, marginTop: '6%', height: '80vh' }}>
        <MapApp properties={properties}/>
        <HouseList />
      </Box>
    </Box>
  );
}

export default Dashboard;
