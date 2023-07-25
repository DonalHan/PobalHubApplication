import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import HouseItem from './HouseItem';
import FinancialAnalytics from '../FirstPanel/FinancialAnalytics';

function HouseList({ houses: initialHouses }) { 

  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    setHouses(initialHouses);
  }, [initialHouses]);

  const handleHouseItemClick = (house) => {
    setSelectedHouse(house);
  };

  return (
    <>
      <FinancialAnalytics setSelectedHouse={setSelectedHouse} houseData={selectedHouse} />
      <Box sx={{ width: '23%', padding: 1, bgcolor: 'background.secondary', height: '100%', overflowY: 'auto'}}>
        <div>
          {houses.map(house => (
            <HouseItem key={house.id} house={house} onClick={() => handleHouseItemClick(house)} />
          ))}
        </div>
      </Box>
    </>
  );
}

export default HouseList;
