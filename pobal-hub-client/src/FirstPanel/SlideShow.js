import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from '@mui/material';

function Slideshow({  images = [] }) {

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevActiveIndex) => 
      prevActiveIndex === images.length - 1 ? 0 : prevActiveIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevActiveIndex) => 
      prevActiveIndex === 0 ? images.length - 1 : prevActiveIndex - 1
    );
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', ml: 4, mt: 4, width: '100%', height: 'auto'}}>
      <Box sx={{position: 'relative', flex: 3}}>
        <IconButton onClick={handlePrev} sx={{position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)'}}>
          <ArrowBackIosIcon />
        </IconButton>
        <img src={images[activeIndex]} alt="Slideshow" style={{width: '100%', height: '100%', objectFit: 'contain' }}/>
        <IconButton onClick={handleNext} sx={{position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)'}}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', marginLeft: 1, flex: 1}}>
        {images.map((img, index) => (
            <img 
                key={index} 
                src={img} 
                alt="Thumbnail" 
                style={{ width: '75%', cursor: 'pointer', padding: 5}} 
                onClick={() => setActiveIndex(index)}
            />
        ))}
      </Box>
    </Box>
  );
}

export default Slideshow;
