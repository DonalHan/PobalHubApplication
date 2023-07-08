import { ResponsivePie } from '@nivo/pie';
import { Box, Typography } from '@mui/material';

const MyResponsivePie = ({ socialData }) => {
  const data = [
    { id: 'Parks & Greenways', value: socialData.proximityToParks },
    { id: 'Amenities', value: socialData.proximityToAmenities },
    { id: 'City Center Access', value: socialData.proximityToCityCenter },
    { id: 'Transport', value: socialData.proximityToTransport },
    { id: 'Crime Index', value: socialData.crimeRate },
  ];

  const totalScore = (socialData.proximityToParks + socialData.proximityToAmenities + socialData.proximityToCityCenter + socialData.proximityToTransport + socialData.crimeRate);
  const finalScore = 100 - totalScore;
  const startAngle = (finalScore / 100) * 360;

  return (
    <Box display="flex" alignItems="center" justifyContent="center" position="relative" height="100%" width="100%">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={startAngle}
        innerRadius={0.65}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'blue_green' }}
        borderColor={{ from: 'color', modifiers: [['darker', '0.1']] }}
        arcLinkLabelsTextOffset={8}
        arcLinkLabelsTextColor="#4CCEAC"
        arcLinkLabelsOffset={-8}
        arcLinkLabelsDiagonalLength={15}
        arcLinkLabelsStraightLength={19}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor="#4CCEAC"
        arcLabelsTextColor="#4CCEAC"
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          { match: { id: 'Parks & Greenways' }},
          { match: { id: 'Amenities' } },
          { match: { id: 'City Center Access' } },
          { match: { id: 'Transport' } },
          { match: { id: 'Crime Index' } },
        ]}
      />
      <Box  position="absolute" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4}}>
        <Typography variant="h1" color="text.primary">
          {totalScore} 
        </Typography>
        <Typography variant="h4" color="text.primary">
          Points
      </Typography>
      </Box>

    </Box>
  );
};

export default MyResponsivePie;
