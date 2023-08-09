import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IndexCircle from '../FirstPanel/IndexCircle';
import MyResponsivePie from './PieChart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';


const SocialAnalytics = ({ socialData, setShowSocialAnalytics }) => {
  const [neighborhood, setNeighborhood] = useState(null);
  const [crimeScore, setCrimeScore] = useState(null);

  //Variables to store the score calculations
  let busScore = socialData.scoreAndDistance.scores.bus;
  let parkScore = socialData.scoreAndDistance.scores.park;
  let cityScore = socialData.scoreAndDistance.scores.city;
  let shopScore = socialData.scoreAndDistance.scores.shop;
  
  //Variables to store the score calculations
  let busDist = socialData.scoreAndDistance.distances.bus;
  let parkDist = socialData.scoreAndDistance.distances.park;
  let cityDist = socialData.scoreAndDistance.distances.city;
  let shopDist = socialData.scoreAndDistance.distances.shop;
  let scores = socialData.scoreAndDistance.scores;
  const [loading, setLoading] = useState(true); // Initialize loading state while the app proccesses social analytics


  const handleBackClick = () => {
    setShowSocialAnalytics(false);
  };

  useEffect (() =>{
    const fetchNeighborhoodCrime = async () =>{
      try{
        setLoading(true); 
        const response = await axios.get(`/api/neighborhood/${socialData.houseData.neighborhoodId}`);
        setNeighborhood(response.data);
      }
      catch(error) {
        console.error(`Failed to fetch neighborhood data: ${error}`)
      } finally {
        setLoading(false); 
      }
    };
    fetchNeighborhoodCrime();
  }, [socialData.houseData.neighborhoodId])

  useEffect(() => {
    if (neighborhood) {
      const calculateCrimeScore = (crimeRate) => {
        if (crimeRate >= 80) {
          return 20;
        } else if (crimeRate >= 60) {
          return 16;
        } else if (crimeRate >= 40) {
          return 12;
        } else if (crimeRate >= 20) {
          return 8;
        } else {
          return 4;
        }
      };
      setCrimeScore(calculateCrimeScore(neighborhood.crime));
    }
  }, [neighborhood]);

  const getCrimeAdjective = (crimeScore) => {
    if (crimeScore >= 16) {
      return "a very safe";
    } else if (crimeScore >= 12) {
      return "a safe";
    } else if (crimeScore >= 8) {
      return "a moderate";
    } else if (crimeScore >= 4) {
      return "an unsafe";
    } else {
      return "a very unsafe";
    }
  };
  
  const getAdjective = (score) => {
    if (score <= 4) {
      return 'very poor';
    } else if (score <= 8) {
      return 'poor';
    } else if (score <= 12) {
      return 'good';
    } else if (score <= 16 ) {
      return 'great';
    } else {
      return 'excellent';
    }
  };

  
  if (loading) {
    return <div>Loading...</div>; // Or some loading spinner component
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px'}}>
        <Typography variant="h1">Social Analytics</Typography>
        <IconButton onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>
      </Box>


      <Box sx={{bgcolor: 'background.default',width: '90%', p: 3}}>
        <Box sx={{pt: 1, pl: 3, mb: 2}}>
          <Typography variant="h3">Summary</Typography>
          <Typography variant="h4" sx={{color: 'secondary.main'}}>{socialData.houseData.address} has the following neighbourhood rating</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-between',alignItems: 'center', width: '53vw', height: '15vw', p: '2vh'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '60%', height: 'auto'}}>
              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <Box component={CheckCircleOutlineIcon}/>               
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(parkScore)} access to parks, greenways, and beaches
                </Typography>
              </Box>
              
              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <Box component={CheckCircleOutlineIcon}/>               
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                     Has {getAdjective(shopScore)} access to amenities
                </Typography>
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', ml: 4}}>
                <Box component={CheckCircleOutlineIcon}/>               
                <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
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
                  <Box component={CheckCircleOutlineIcon}/>               
                  {crimeScore && <Typography variant="h5" sx={{ p: 1, fontSize: '1.2vw'}}>
                      Has {getAdjective(crimeScore)} crime rate index
                  </Typography>}
              </Box>
            </Box>
            <Box sx={{width:'50%', height: '35vh', padding:'10px'}}>
               <MyResponsivePie socialData={scores} crimeScore={crimeScore}/>
            </Box>

        </Box>
      </Box>

      <Box sx={{display: 'flex', width: '92%', justifyContent: 'space-between'}}>
        <Box sx={{bgcolor: 'background.default', width:'33%', margin:'10px', p:'1.5vw'}}>
        <   Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: -1}}>
                <Typography variant="h5" sx={{ fontSize: '1.2vw', color: 'secondary.main'}}>Parks & Greenways</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle progress={parkScore/20} size='3' showText={false}/>
                </Box>
            </Box>
            <Typography variant="h5" sx={{ fontSize: '1.2vw'}}>
              This property is approximately <Box component="span" sx={{ color: "#6870FA" }}>{parkDist}km</Box> from a park
            </Typography>

        </Box>

        <Box sx={{bgcolor: 'background.default', width:'33%', margin:'10px', p:'1.5vw'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: -1}}>
                <Typography variant="h5" sx={{fontSize: '1.2vw', color: 'secondary.main'}}>Amenities</Typography>
                <Box sx={{p: 2}}>  
                    <IndexCircle progress={shopScore/20} size='3' showText={false}/>
                </Box>
            </Box>
            <Typography variant="h5" sx={{ fontSize: '1.2vw'}}>
              This property is approximately <Box component="span" sx={{ color: "#6870FA" }}>{shopDist}km</Box> from a supermarket
            </Typography>
        </Box>

        <Box sx={{bgcolor: 'background.default', width:'33%', margin:'10px', p:'1.5vw'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: -1}}>
                <Typography variant="h5" sx={{ fontSize: '1.2vw', color: 'secondary.main'}}>City Center Access</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle progress={cityScore/20} size='3' showText={false}/>
                </Box>
            </Box>
            <Typography variant="h5" sx={{fontSize: '1.2vw'}}>
              This property is approximately <Box component="span" sx={{ color: "#6870FA" }}>{cityDist}km</Box> from the city center
            </Typography>
        </Box>
      </Box>
     
      <Box sx={{display: 'flex', width: '92%', justifyContent: 'space-between'}}>
        <Box sx={{bgcolor: 'background.default', width:'50%', margin:'10px', p:'1.5vw'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: -1}}>
                <Typography variant="h5" sx={{ fontSize: '1.2vw', color: 'secondary.main'}}>Transport Index</Typography>
                <Box sx={{p: 2}}> 
                    <IndexCircle progress={busScore/20} size='3' showText={false}/>
                </Box>
            </Box>
            <Typography variant="h5" sx={{ fontSize: '1.2vw'}}>
              This property is approximately <Box component="span" sx={{ color: "#6870FA" }}>{busDist}km</Box> from transport
            </Typography>
        </Box>
        
        <Box sx={{bgcolor: 'background.default', width:'50%', margin:'10px', p:'1.5vw'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: -1}}>
                <Typography variant="h5" sx={{ fontSize: '1.2vw', color: 'secondary.main'}}>Crime Rate Index{socialData && socialData.proximityToParks}</Typography>
                <Box sx={{p: 2}}>
                    {crimeScore && <IndexCircle progress={crimeScore/20} size='3' showText={false}/>}
                </Box>
            </Box>
            <Typography variant="h5" sx={{ fontSize: '1.2vw'}}>
                {neighborhood && neighborhood.name} is {crimeScore && <Box component="span" sx={{ color: "#6870FA" }}>{getCrimeAdjective(crimeScore)}</Box>} place to live
            </Typography>
                    
        </Box>
      </Box>
    </Box>
    
  );
};

export default SocialAnalytics;
