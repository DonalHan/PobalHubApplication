import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import MapThumbnail from './MapThumbnail';

const DescriptionPanel = ({ description, coordinates }) => {
    const [isFullTextVisible, setIsFullTextVisible] = useState(false); //state for visibility tracking

    return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box sx={{ 
            bgcolor: 'background.default', 
            width: '90%', 
            margin: '10px',
            p: 3
        }}>

            <Box sx={{display: 'flex'}}>
                <Box className={!isFullTextVisible ? "fade-out" : ""} sx={{  //css styling to have the bottom of the description panel fade if too long
                    flex: 1,
                    height: isFullTextVisible ? 'auto' : '15vw', 
                    overflow: isFullTextVisible ? 'auto' : 'hidden', //have text hidden be default if overflow, but make the div the size of the text one user want to see more
                    display: '-webkit-box', 
                    WebkitBoxOrient: 'vertical',
                }}>
                    {description ? description.split('\n').map((text, index) => ( //break the description into lines
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
                    {isFullTextVisible ? "Show Less" : "Show More"} {/*have the button say show more or show less based on text visibility*/}
                </Button>
            </Box>
            
            
        </Box>
    </Box>
    );
}

export default DescriptionPanel;
