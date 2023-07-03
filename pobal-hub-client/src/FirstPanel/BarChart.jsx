import { Box, Typography } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ currentHousePrice }) => {
    // Remove the euro sign and comma, then parse the result to a number
    const housePriceNumber = Number(currentHousePrice.replace(/€|,/g, ''));

    const averagePrice = 750000;
    const difference = housePriceNumber - averagePrice;

    // Mock data
    const data = [
        {
            "suburb": "Current Property",
            "price": housePriceNumber,
            "color": "#f47560"
        },
        {
            "suburb": "Neighbourhood Average",
            "price": averagePrice,
            "color": "#e8c1a0"
        }
    ];
    
    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Box sx ={{display: 'flex', justifyContent: 'space-between'}}>
                <h1>Neighbourhood Price Comparison</h1>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 20, pt:1}}>
                    <h2>This property is currently:</h2>
                    <Typography variant="h1" sx={{fontSize: '2.5vw', textDecoration: 'underline'}}>€ {Math.abs(difference)}</Typography> 
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


    );
}

export default BarChart;
