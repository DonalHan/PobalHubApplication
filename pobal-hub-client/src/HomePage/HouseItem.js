import React from 'react';
import { Box } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';

function HouseItem({ house }) {
  return (
    <Box sx={{ display: 'flex', width: '95%', m: 1, bgcolor: 'background.default' }}>
      <Box sx={{ flex: 2, bgcolor: 'neutral.light' }}>
         <img src={house.images[0]} alt={house.address} style={{width: "100%", height: "auto"}}/>

      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3, p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
          <HouseIcon sx={{ color: 'secondary.main', mr: 1 }}/>
          <Box component="span" sx={{ fontSize: '1.2vw' }}>{house.price}</Box>
        </Box>
        <Box component="span" sx={{ fontSize: '1vw' }}>{house.type}</Box>
        <Box component="span" sx={{ fontSize: '.7vw' }}>{house.address}</Box>
      </Box>
    </Box>
  );
}

export default HouseItem;
