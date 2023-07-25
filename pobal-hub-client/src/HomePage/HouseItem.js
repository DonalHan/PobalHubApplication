import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import axios from 'axios';

function HouseItem({ house, onClick }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`/api/property-images/property/${house.id}`);
        if (response.data[0]) {
          setImage(response.data[0].imagePath);
        }
      } catch (error) {
        console.error('Failed to fetch property image: ', error);
      }
    }
    fetchImage();
  }, [house.id]);  // dependency array to ensure effect runs whenever house.id changes

  return (
    <Box sx={{ display: 'flex', width: '95%', m: 1, bgcolor: 'background.default', cursor: 'pointer' }} onClick={onClick}>
      <Box sx={{ flex: 2, bgcolor: 'neutral.light' }}>
      {image && <img src={image} alt={house.address} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}} />}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3, p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
          <HouseIcon sx={{ color: 'secondary.main', mr: 1 }}/>
          <Box component="span" sx={{ fontSize: '1.2vw' }}>{`€${house.price.toLocaleString()}`}</Box>
        </Box>
        <Box component="span" sx={{ fontSize: '2vh' }}>{house.type}</Box>
        <Box component="span" sx={{ fontSize: '.7vw' }}>{house.address}</Box>
      </Box>
    </Box>
  );
}

export default HouseItem;
