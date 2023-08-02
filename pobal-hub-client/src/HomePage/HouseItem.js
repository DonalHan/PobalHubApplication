//A house component that each house up the component tree is passed into
import { Box } from '@mui/material';
import HouseIcon from '@mui/icons-material/House';

function HouseItem({ house, onClick }) {

  return (
    <Box sx={{ display: 'flex', width: '95%', m: 1, bgcolor: 'background.default', cursor: 'pointer' }} onClick={onClick}>
      <Box sx={{ flex: 2, bgcolor: 'neutral.light' }}>
      {house.image && <img src={house.image} alt={house.address} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center"}} />}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 3, p: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> 
          <HouseIcon sx={{ color: 'secondary.main', mr: 1 }}/>
          <Box component="span" sx={{ fontSize: '1.2vw' }}>{`€${house.price.toLocaleString()}`}</Box>
        </Box>
        <Box component="span" sx={{ fontSize: '2vh' }}>{house.type}</Box>
        <Box component="span" sx={{ fontSize: '.7vw' }}>{house.address}</Box>
      </Box>
    </Box>
  );
}

export default HouseItem;
