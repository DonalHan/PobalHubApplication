import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Slideshow from './SlideShow';
import IndexCircle from './IndexCircle';
import DescriptionPanel from './DescriptionPanel';
import BarChart from './BarChart';
import MyResponsiveLine from './LineChart';
import SocialAnalytics from '../SecondPanel/SocialAnalytics';

const FinancialAnalytics = ({ houseData, setSelectedHouse }) => {
    // Add state to handle the visibility of the panel
    const images = ["/images/imageOne.jpg", "/images/imageTwo.jpg", "/images/imageThree.jpg", "/images/imageFour.jpg"];
    const [isVisible, setIsVisible] = useState(false);
    const [showSocialAnalytics, setShowSocialAnalytics] = useState(false);
    const panelRef = useRef(); // Create a ref to the panel

    useEffect(() => {
      if (houseData) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, [houseData]);

    useEffect(() => {
      function handleClickOutside(event) {
          if (panelRef.current && !panelRef.current.contains(event.target)) {
            setSelectedHouse(null);
            setIsVisible(false);
            setShowSocialAnalytics(false); // Resetting the showSocialAnalytics state
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setSelectedHouse]); // include setSelectedHouse in the dependency array

    return (
      <div ref={panelRef} className={`panel ${isVisible ? 'panel-visible' : ''}`}>
        {showSocialAnalytics ? (
          <SocialAnalytics socialData={houseData && houseData.socialData} setShowSocialAnalytics={setShowSocialAnalytics} />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{bgcolor: 'background.default', width:'90%', height: '60%', margin:'10px', display: 'flex', justifyContent: 'space-evenly'}}>
              <Box>
                {houseData && <Slideshow images={images} />}
                <Box component="span" sx={{ fontSize: '2.5vw', ml: 4, mt: 0 }}>{houseData && houseData.address}</Box>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.6vw',  ml: 4, mb: 2, p: 0, color: 'secondary.main'}}>
                  <div>{houseData && `€${houseData.price.toLocaleString()}`}</div>
                  <div>{houseData && houseData.eircode} - {houseData && houseData.type}</div>
                </Box>              
              </Box>
              <Box sx={{m: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IndexCircle/>
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

            <DescriptionPanel description={houseData && houseData.propertyDescription} coordinates={houseData && [houseData.longitude, houseData.latitude]} />

            <Box sx={{bgcolor: 'background.default', width:'90%', height: '50vh', margin:'10px'}}>
              {houseData && <BarChart currentHousePrice={houseData.price}/>}
            </Box>

            <Box sx={{bgcolor: 'background.default', width:'90%', height: '40vh', margin:'10px'}}>
              {houseData && <MyResponsiveLine/>}
            </Box>
          </Box>
        )}
      </div>
    );
};
  
export default FinancialAnalytics;
