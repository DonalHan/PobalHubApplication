import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import HouseItem from './HouseItem';
import { houses as mockHouses } from './Houses'; // import the mock data

function HouseList() {
 
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Use the mock data instead of making an API request
    setHouses(mockHouses);
  }, []);

  return (
    <Box sx={{ width: '23%', padding: 1, bgcolor: 'background.secondary', height: '100%', overflowY: 'auto'}}>
      <div>
        {houses.map(house => (
          <HouseItem key={house.id} house={house} />
        ))}
      </div>
    </Box>
  );
}

export default HouseList;
