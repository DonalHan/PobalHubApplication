import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IndexCircle from '../FirstPanel/IndexCircle';
import mockSocialData from './MockSocialData';
import MyResponsivePie from './PieChart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SocialAnalytics = ({ socialData, setShowSocialAnalytics }) => {
  const handleBackClick = () => {
    setShowSocialAnalytics(false);
  };
  
  const getAdjective = (score) => {
    if (score <= 4) {
      return 'poor';
    } else if (score <= 8) {
      return 'bad';
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
          <Typography variant="h4" sx={{color: 'secondary.main'}}>has the following neighbourhood rating</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between',alignItems: 'center', width: '53vw', height: '15vw'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', mt: '1vw'}}>
              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <CheckCircleOutlineIcon/>
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(mockSocialData.proximityToParks)} access to parks, greenways, and beaches
                </Typography>
              </Box>
              
              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <CheckCircleOutlineIcon/>
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(mockSocialData.proximityToAmenities)} access to amenities
                </Typography>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <CheckCircleOutlineIcon/>
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(mockSocialData.proximityToCityCenter)} access to the city center
                </Typography>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <CheckCircleOutlineIcon/>
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(mockSocialData.proximityToTransport)} access to transport
                </Typography>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <CheckCircleOutlineIcon/>
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(mockSocialData.crimeRate)} crime rate index
                </Typography>
              </Box>
            </Box>
            <Box sx={{width:'50%', height: '35vh', padding:'10px'}}>
               <MyResponsivePie socialData={mockSocialData} />
            </Box>

        </Box>
  
      </Box>

      <Box sx={{display: 'flex', width: '92%', justifyContent: 'space-between'}}>
        <Box sx={{bgcolor: 'background.default', width:'33%', height: '20vh', margin:'10px'}}>
        <   Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>Parks & Greenways{socialData && socialData.proximityToParks}</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle size='4' showText={false}/>
                </Box>
            </Box>
        </Box>

        <Box sx={{bgcolor: 'background.default', width:'33%', height: '20vh', margin:'10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>Amenities{socialData && socialData.proximityToParks}</Typography>
                <Box sx={{p: 2}}>  
                    <IndexCircle size='4' showText={false}/>
                </Box>
            </Box>
        </Box>

        <Box sx={{bgcolor: 'background.default', width:'33%', height: '20vh', margin:'10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>City Center Access{socialData && socialData.proximityToParks}</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle size='4' showText={false}/>
                </Box>
            </Box>
        </Box>
      </Box>
     
      <Box sx={{display: 'flex', width: '92%', justifyContent: 'space-between'}}>
        <Box sx={{bgcolor: 'background.default', width:'50%', height: '20vh', margin:'10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>Transport Index{socialData && socialData.proximityToParks}</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle size='4' showText={false}/>
                </Box>
            </Box>
        </Box>
        
        <Box sx={{bgcolor: 'background.default', width:'50%', height: '20vh', margin:'10px'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m: 2, fontSize: '1.2vw'}}>Crime Rate Index{socialData && socialData.proximityToParks}</Typography>
                <Box sx={{p: 2}}>
                    <IndexCircle size='4' showText={false}/>
                </Box>
            </Box>        
          </Box>
      </Box>
    </Box>
    
  );
};

export default SocialAnalytics;
