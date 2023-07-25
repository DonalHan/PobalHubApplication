import React from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Slideshow from './SlideShow';
import IndexCircle from './IndexCircle';

const PropertyInformation = ({ houseData, images, scoreAndDistance, setShowSocialAnalytics }) => (
  
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Box sx={{bgcolor: 'background.default', width:'90%', height: '60%', margin:'10px', display: 'flex', justifyContent: 'space-evenly'}}>
      <Box>
        {houseData && <Slideshow images={images} />}
        
        <Typography sx={{ fontSize: '2vw', ml: 4, mt: 0 }}>{houseData && houseData.address}</Typography>
    
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.6vw',  ml: 4, mb: 2, p: 0, color: 'secondary.main'}}>
          <div>{houseData && `€${houseData.price.toLocaleString()}`}</div>
          <div>{houseData && houseData.eircode} - {houseData && houseData.type}</div>
        </Box>              
      </Box>
      <Box sx={{m: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <IndexCircle progress={scoreAndDistance ? scoreAndDistance.scores.total / 100 : 0} />
        <Typography variant="h3" 
          sx={{ mt: 3, color: 'secondary.main', fontSize: '1.5vw', textDecoration: 'underline', cursor: 'pointer'}}
          onClick={() => setShowSocialAnalytics(true)}
        >
          Neighbourhood Index
        </Typography> 
        <Box sx={{mt: 5, color: 'secondary.main'}}>
          <FavoriteIcon sx={{ml: 1, mr: 1, cursor: 'pointer'}}/>
          <PrintIcon sx={{ml: 1, mr: 1, cursor: 'pointer'}}/>
          <ShareIcon sx={{ml: 1, mr: 1, cursor: 'pointer'}}/>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default PropertyInformation;
