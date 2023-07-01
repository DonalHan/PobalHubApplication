import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import MapThumbnail from './MapThumbnail';

const DescriptionPanel = ({ description, coordinates }) => {
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);

    return (
        <Box sx={{ 
            bgcolor: 'background.default', 
            width: '90%', 
            margin: '10px',
            p: 3
        }}>

            <Box sx={{display: 'flex'}}>
                <Box className={!isFullTextVisible ? "fade-out" : ""} sx={{ 
                    flex: 1,
                    height: isFullTextVisible ? 'auto' : '15vw', 
                    overflow: isFullTextVisible ? 'auto' : 'hidden', 
                    display: '-webkit-box', 
                    WebkitBoxOrient: 'vertical',
                }}>
                    {description ? description.split('\n').map((text, index) => (
                                <React.Fragment key={index}>
                                    {text}
                                    <br />
                                </React.Fragment>
                        )) : "No description available"}
                        
                </Box>
                {coordinates && <MapThumbnail coordinates={coordinates} sx={{flex: 1, ml: 3, p: 3}} />}
                
            </Box>
            <Box sx={{ mt: 2 }}>
                <Button sx={{color: 'secondary.main'}} onClick={() => setIsFullTextVisible(prevState => !prevState)}>
                    {isFullTextVisible ? "Show Less" : "Show More"}
                </Button>
            </Box>
            
            
        </Box>
    );
}

export default DescriptionPanel;
