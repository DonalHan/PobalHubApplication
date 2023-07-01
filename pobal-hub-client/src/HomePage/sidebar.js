import React from 'react';
import { Box, Avatar, Typography, IconButton, useTheme} from '@mui/material';
import InputBase from "@mui/material/InputBase"
import SearchIcon  from "@mui/icons-material/Search";
import { tokens } from '../theme';
import Slider from '@mui/material/Slider';

function Sidebar() {
    const theme = useTheme();
    const colors = tokens (theme.palette.mode);
    

  return (

    <Box sx={{ width: 250, padding: 3, bgcolor: 'background.secondary', height: '100vh', marginRight: 0}}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar src="profile.jpg" sx={{ width: 80, height: 80 }} /> {/* Replace "profile.jpg" with the path to your image */}
            <Typography variant="h3" sx={{ mt: 1 }}>Donal Hanway</Typography> {/* Replace "Your Name" with the actual name */}
            <Typography variant="h6" sx={{ mt: 1 }} color= 'secondary' fontFamily='sans-serif'>@DonHan99</Typography> {/* Replace "Your Name" with the actual name */}
        </Box>
      
      
        <Box display = "flex" backgroundColor = {colors.primary[400]}  borderRadius= "3px" >
            <InputBase sx = {{ml: 2, flex: 1}} placeholder = "Search"></InputBase>
            
            <IconButton type = "button" sx={{p: 1}}>
                <SearchIcon />
            </IconButton>
        </Box>

        <Box sx = {{paddingTop: 1, display: 'flex', flexDirection: 'column'}} >
            <Typography variant="h6" sx={{ mt: 1 }}>Price Filter: </Typography> {/* Replace "Your Name" with the actual name */}

            <Slider
                defaultValue={30}
                getAriaValueText={value => `${value}°C`}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                min={100}
                max={1000}
                color='secondary'
            />
        </Box>
       
    </Box>
  );
}

export default Sidebar;

