import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IndexCircle from '../FirstPanel/IndexCircle';
import mockSocialData from './MockSocialData';
import MyResponsivePie from './PieChart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SocialAnalytics = ({ socialData, setShowSocialAnalytics }) => {
  
  let busScore = socialData.scoreAndDistance.scores.bus;
  let parkScore = socialData.scoreAndDistance.scores.park;
  let cityScore = socialData.scoreAndDistance.scores.city;
  let shopScore = socialData.scoreAndDistance.scores.shop;
  let crimeScore = socialData.scoreAndDistance.scores.crime;

  let busDist = socialData.scoreAndDistance.distances.bus;
  let parkDist = socialData.scoreAndDistance.distances.park;
  let cityDist = socialData.scoreAndDistance.distances.city;
  let shopDist = socialData.scoreAndDistance.distances.shop;
  let scores = socialData.scoreAndDistance.scores;

  const handleBackClick = () => {
    setShowSocialAnalytics(false);
  };
  
  const getAdjective = (score) => {
    if (score <= 4) {
      return 'very poor';
    } else if (score <= 8) {
      return 'poor';
    } else if (score <= 12) {
      return 'good';
    } else if (score <= 16) {
      return 'great';
    } else {
      return 'excellent';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px'}}>
        <Typography variant="h1">Social Analytics</Typography>
        <IconButton onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>
      </Box>


      <Box sx={{bgcolor: 'background.default', width:'90%', height: '25vw', p: 2}}>
        
        <Box sx={{pt: 1, pl: 3, mb: 2}}>
          <Typography variant="h3">Summary</Typography>
          <Typography variant="h4" sx={{color: 'secondary.main'}}>{socialData.houseData.address} has the following neighbourhood rating</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between',alignItems: 'center', width: '53vw', height: '15vw'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', mt: '1vw'}}>
              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
              <Box component={CheckCircleOutlineIcon} sx={{fontSize: {
                      xs: '3vw',  // for screen width: 0px - 600px
                      sm: '2.5vw', // for screen width: 600px - 960px
                      md: '2vw', // for: 960px - 1280px
                      lg: '1.5vw', // for screen width: 1280px - 1920px
                      xl: '1vw', // for screen width: >1920px
                    },
                  }}/>                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(parkScore)} access to parks, greenways, and beaches
                </Typography>
              </Box>
              
              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
              <Box component={CheckCircleOutlineIcon} sx={{fontSize: {
                      xs: '3vw',  // for screen width: 0px - 600px
                      sm: '2.5vw', // for screen width: 600px - 960px
                      md: '2vw', // for: 960px - 1280px
                      lg: '1.5vw', // for screen width: 1280px - 1920px
                      xl: '1vw', // for screen width: >1920px
                    },
                  }}/>                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(shopScore)} access to amenities
                </Typography>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
              <Box component={CheckCircleOutlineIcon} sx={{fontSize: {
                      xs: '3vw',  // for screen width: 0px - 600px
                      sm: '2.5vw', // for screen width: 600px - 960px
                      md: '2vw', // for: 960px - 1280px
                      lg: '1.5vw', // for screen width: 1280px - 1920px
                      xl: '1vw', // for screen width: >1920px
                    },
                  }}/>                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(cityScore)} access to the city center
                </Typography>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <CheckCircleOutlineIcon/>
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(busScore)} access to transport
                </Typography>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
              <Box component={CheckCircleOutlineIcon} sx={{fontSize: {
                      xs: '3vw',  // for screen width: 0px - 600px
                      sm: '2.5vw', // for screen width: 600px - 960px
                      md: '2vw', // for: 960px - 1280px
                      lg: '1.5vw', // for screen width: 1280px - 1920px
                      xl: '1vw', // for screen width: >1920px
                    },
                  }}/>
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(crimeScore)} crime rate index
                </Typography>
              </Box>
            </Box>
            <Box sx={{width:'50%', height: '35vh', padding:'10px'}}>
               <MyResponsivePie socialData={scores} />
            </Box>

        </Box>
  
      </Box>

      <Box sx={{display: 'flex', width: '92%', justifyContent: 'space-between'}}>
        <Box sx={{bgcolor: 'background.default', width:'33%', height: '20vh', margin:'10px'}}>
        <   Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw', color: 'secondary.main'}}>Parks & Greenways</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle progress={parkScore/20} size='4' showText={false}/>
                </Box>
            </Box>
            <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>
              This property is approximately <Box component="span" sx={{ color: "#6870FA" }}>{parkDist}km</Box> from a park
            </Typography>

        </Box>

        <Box sx={{bgcolor: 'background.default', width:'33%', height: '20vh', margin:'10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw', color: 'secondary.main'}}>Amenities</Typography>
                <Box sx={{p: 2}}>  
                    <IndexCircle progress={shopScore/20} size='4' showText={false}/>
                </Box>
            </Box>
            <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>
              This property is approximately <Box component="span" sx={{ color: "#6870FA" }}>{shopDist}km</Box> from a supermarket
            </Typography>
        </Box>

        <Box sx={{bgcolor: 'background.default', width:'33%', height: '20vh', margin:'10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw', color: 'secondary.main'}}>City Center Access</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle progress={cityScore/20} size='4' showText={false}/>
                </Box>
            </Box>
            <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>
              This property is approximately <Box component="span" sx={{ color: "#6870FA" }}>{cityDist}km</Box> from the city center
            </Typography>
        </Box>
      </Box>
     
      <Box sx={{display: 'flex', width: '92%', justifyContent: 'space-between'}}>
        <Box sx={{bgcolor: 'background.default', width:'50%', height: '20vh', margin:'10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw', color: 'secondary.main'}}>Transport Index</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle progress={busScore/20} size='4' showText={false}/>
                </Box>
            </Box>
            <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>
              This property is approximately <Box component="span" sx={{ color: "#6870FA" }}>{busDist}km</Box> from transport
            </Typography>
        </Box>
        
        <Box sx={{bgcolor: 'background.default', width:'50%', height: '20vh', margin:'10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw', color: 'secondary.main'}}>Crime Rate Index{socialData && socialData.proximityToParks}</Typography>
                <Box sx={{p: 2}}>
                    <IndexCircle progress={crimeScore/20} size='4' showText={false}/>
                </Box>
            </Box>
                    
        </Box>
      </Box>
    </Box>
    
  );
};

export default SocialAnalytics;
