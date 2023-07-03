import { ResponsiveLine } from '@nivo/line';
import { Box, Typography} from '@mui/material';
import { BasicTooltip } from '@nivo/tooltip';



// Your property's initial value in 2013
const initialValue = 200000;

// We'll calculate the annual appreciation (5%)
const appreciation = initialValue * 0.05;

// Now we can generate the data
const generateData = () => {
    let data = [];

    for (let year = 2013; year <= 2033; year++) {
        let value = initialValue + ((year - 2013) * appreciation);

        data.push({ x: year, y: value });
    }

    return [{ id: 'Property Value', data }];
};

const MyResponsiveLine = () => {
    const data = generateData();

    return (
    
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h1" sx={{fontSize: '2vw', marginRight: 65, marginTop: 2}}>Price Appreciation</Typography> 
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 70, bottom: 100, left: 100 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 100000,
                max: 1000000,
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            tooltip={({ point }) => {
                const { data } = point
                return (
                    <BasicTooltip
                        id={data.serieId}
                        value={`Year: ${data.x}, Price: ${data.yFormatted}`}
                        color={"black"}
                    />
                )
            }}
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
                }
            }}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Years',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Price',
                legendOffset: -80,
                legendPosition: 'middle'
            }}
            lineWidth={5}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-20}
            areaOpacity={0.15}
            useMesh={true}

        />

        </Box>
        
    );
};

export default MyResponsiveLine;
