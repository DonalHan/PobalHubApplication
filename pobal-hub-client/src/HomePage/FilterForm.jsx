import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, MenuItem, Select, IconButton, InputBase, Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import SearchIcon from '@mui/icons-material/Search';

function FilterForm({ search, setSearch, price, setPrice, propertyType, setPropertyType, setSearchClicked }) {
  
  const [sliderValue, setSliderValue] = useState(price);  // Add this line for the new state

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setSliderValue(newValue.map(v => v * 1000)); // Update the sliderValue state instead of price
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleSearchClick = () => {
    console.log("Search button clicked");
    setPrice(sliderValue);  // Update the price state from the sliderValue state
    setSearchClicked(true);
  };

  const handleResetClick = () => {
    setSearch('');
    setSliderValue([100000, 1000000]); // Reset sliderValue state instead of price state
    setPropertyType('');
    setSearchClicked(true); // trigger a new search with the empty criteria
  };
  
  

  return (
    <Box display= "flex" flexDirection= "column" alignContent="center">
      <Box display = "flex" bgcolor = "primary.main"  borderRadius= "3px" >
        <InputBase 
          value={search}
          onChange={handleSearchChange}
          sx = {{ml: 2, flex: 1}} 
          placeholder = "Search"
        />
        <IconButton type = "button" sx={{p: 1}}>
            <SearchIcon />
        </IconButton>
      </Box>

      <Box sx = {{paddingTop: 1, display: 'flex', flexDirection: 'column'}} >
        <Typography variant="h6" sx={{ mt: 1 }}>Price Filter: </Typography> 

        <Slider
            value={sliderValue.map(v => v / 1000)}  // Use sliderValue instead of price
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            step={50}
            min={100}
            max={1000}
            color='secondary'
        />
      </Box>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
        <InputLabel id="property-type">Property Type</InputLabel>
        <Select
          labelId="property-type"
          id="property-type-select"
          value={propertyType}
          onChange={handlePropertyTypeChange}
        >
          <MenuItem value="Detached House">Detached House</MenuItem>
          <MenuItem value="SemiDetached House">SemiDetached House</MenuItem>
          <MenuItem value="Terraced House">Terraced House</MenuItem>
          <MenuItem value="End of Terrace House">End of Terrace House</MenuItem>
          <MenuItem value="Apartment">Apartment</MenuItem>
          <MenuItem value="Duplex">Duplex</MenuItem>
          <MenuItem value="Bungalow">Bungalow</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Button variant="contained" color="secondary" onClick={handleSearchClick}>
            <Typography variant="h6" color={'white'}>Search</Typography> 
        </Button>
        <Button variant="contained" color="primary" onClick={handleResetClick}>
            <Typography variant="h6" color={'white'}>Reset</Typography> 
        </Button>
      </Box>


    </Box>
  );
}

export default FilterForm;
