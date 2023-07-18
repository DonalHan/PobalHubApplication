import { ResponsiveLine } from '@nivo/line';
import { Box, Typography } from '@mui/material';
import { BasicTooltip } from '@nivo/tooltip';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyResponsiveLine = ({ propertyId }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/properties/${propertyId}/appreciation`);
                const fetchedData = Object.entries(response.data).map(([year, value]) => ({ x: year, y: value }));

                setData([{ id: 'Property Value', data: fetchedData }]);
            } catch (error) {
                console.error(`Failed to fetch data: ${error}`);
            }
        };
        fetchData();
    }, [propertyId]);

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
