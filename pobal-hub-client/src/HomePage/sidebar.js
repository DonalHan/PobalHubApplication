import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import FilterForm from './FilterForm';

function Sidebar({ search, setSearch, price, setPrice, propertyType, setPropertyType, setSearchClicked  }) {

  return (
    <Box sx={{ width: 250, padding: 3, bgcolor: 'background.secondary', height: '100vh', marginRight: 0}}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ width: 80, height: 80 }} />
            <Typography variant="h3" sx={{ mt: 1 }}>Donal Hanway</Typography> 
            <Typography variant="h6" sx={{ mt: 1 }} color= 'secondary' fontFamily='sans-serif'>@DonHan99</Typography>
        </Box>
       
        <Box sx={{ pt: 3 }}>
        <FilterForm 
            search={search}
            setSearch={setSearch}
            price={price}
            setPrice={setPrice}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            setSearchClicked={setSearchClicked}
            />
        </Box>
       
    </Box>
  );
}

export default Sidebar;
