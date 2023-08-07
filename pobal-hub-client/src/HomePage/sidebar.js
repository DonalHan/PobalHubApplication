//A sidebar component that hilds the filter form and user information
import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import FilterForm from './FilterForm';

function Sidebar({ search, setSearch, price, setPrice, propertyType, setPropertyType, setSearchClicked  }) {

  return (
    <Box sx={{ width: 250, padding: 3, bgcolor: 'background.secondary', height: '100vh', marginRight: 0}}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 8 }}>
            <Avatar src='/images/Profile.jpg' sx={{ width: 90, height: 90 }} />
            <Typography variant="h3" sx={{ mt: 1 }}>Donal Hanway</Typography> 
            <Typography variant="h6" sx={{ mt: 1 }} color= 'secondary' fontFamily='sans-serif'>@DonHan99</Typography>
        </Box>
       
        <Box sx={{ p: 3, pt: 8 }}>
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
