import React from 'react';
import { Box, Avatar, Typography, IconButton, useTheme} from '@mui/material';
import InputBase from "@mui/material/InputBase"
import SearchIcon  from "@mui/icons-material/Search";
import { tokens } from '../theme';

function Sidebar() {
    const theme = useTheme();
    const colors = tokens (theme.palette.mode);

  return (
    <Box sx={{ width: 250, bgcolor: 'background.secondary', height: '100vh' }}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar src="profile.jpg" sx={{ width: 80, height: 80 }} /> {/* Replace "profile.jpg" with the path to your image */}
        <Typography variant="h6" sx={{ mt: 1 }}>Donal Hanway</Typography> {/* Replace "Your Name" with the actual name */}
      </Box>
      
      
      <Box display = "flex" backgroundColor = {colors.primary[400]}  borderRadius= "3px" >
        <InputBase sx = {{ml: 2, flex: 1}} placeholder = "Search"></InputBase>
        
        <IconButton type = "button" sx={{p: 1}}>
            <SearchIcon />
        </IconButton>
    </Box>
       
    </Box>
  );
}

export default Sidebar;

