import { Box, Typography, CircularProgress  } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BarChart = ({ currentHousePrice, neighborhoodId }) => {
  const [neighborhood, setNeighborhood] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getNeighborhoodData = async () => {
      try {
          const response = await axios.get(`/api/neighborhood/${neighborhoodId}`);
          console.log(response.data);
          setNeighborhood(response.data);
          setLoading(false);
      } catch (error) {
          console.error(`Error retrieving neighborhood data: ${error}`);
          setLoading(false);
      }
    };

    getNeighborhoodData();
  }, [neighborhoodId]);

  if (loading) {
    return <CircularProgress />
  }

  const housePriceNumber = currentHousePrice;
  const averagePrice = neighborhood.averagePrice;
  const difference = parseFloat((housePriceNumber - averagePrice).toFixed(2));
    
  const data = [
        {
            "suburb": "Current Property",
            "price": housePriceNumber,
            "color": "#f47560"
        },
        {
            "suburb": neighborhood.name + " Average",
            "price": averagePrice,
            "color": "#e8c1a0"
        }
    ];
    
    return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{bgcolor: 'background.default', width:'90%', height: '50vh', margin:'10px', p:2}}>
        <Box sx={{width: '100%', height: '100%', alignItems: 'center'}}>
              <Box sx ={{display: 'flex', justifyContent: 'space-between', mr:2}}>
                <Typography sx={{ fontSize: '2vw', ml: 4, mt: 0 }}>Neighbourhood Price Comparison</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt:1}}>
                    <h2>This property is currently:</h2>
                    <Typography variant="h1" sx={{fontSize: '2.5vw'}}>€ {Math.abs(difference)}</Typography> 
                    <Typography variant="h1" sx={{ color: 'secondary.main', fontSize: '1vw'}}>{difference < 0 ? 'under' : 'over'} the neighbourhood average.</Typography>
                </Box>
              </Box>

              <ResponsiveBar
                data={data}
                keys={['price']}
                indexBy="suburb"
                margin={{ top: 3, right: 50, bottom: 200, left: 175 }}
                padding={.6}
                layout="horizontal"
                colors={({data}) => data.color}
                borderRadius={5}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                theme={{
                    tooltip: {
                      container: {
                        background: 'white',
                        color: 'black',
                        },
                      },
                    axis: {
                      ticks: {
                        text: {
                          fill: '#D1D5DB', 
                          fontSize: '.8vw', 
                          fontWeight: 700
                        }
                      },
                      legend: {
                        text: {
                          fill: '#D1D5DB',
                          fontSize: '.8vw',
                          fontWeight: 700
                        }
                      }
                    },
                    labels: {
                      text: {
                        fill: "#ffa500",    // Here you can change the color of the bar labels
                        fontSize: 16,       // Here you can change the font size of the bar labels
                        fontWeight: 700  
                    }
                    }
                  }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'price',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'suburb',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                
                labelSkipHeight={12}
                labelTextColor="#141B2D"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />

        </Box>
      </Box>
    </Box>
    );
}

export default BarChart;
