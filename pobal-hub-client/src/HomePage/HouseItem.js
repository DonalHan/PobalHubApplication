import React from 'react';
import { Box } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';

function HouseItem({ house }) {
  return (
    <Box sx={{ display: 'flex', width: 250,height: '100px', padding: 0, margin: 2, bgcolor: 'background.default'}}>
        <Box sx={{ width: '100px', bgcolor: 'neutral.light', height: '100px' }}>Image</Box>
        
        <Box sx={{display: 'flex', flexDirection: 'column', p: 1, m: 0, b: 0}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}> 
                <HouseIcon sx={{color: 'secondary.main', marginRight: 5}}/>
                <h2>{house.price}</h2>
            </Box>
            
            <h4>{house.type}</h4>
            <h6>{house.address}</h6>
        </Box>
       
    </Box>
  );
}

export default HouseItem;
