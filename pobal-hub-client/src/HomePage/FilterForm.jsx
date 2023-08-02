// A file that is used for creating a filter form element
import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, MenuItem, Select, IconButton, InputBase, Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import SearchIcon from '@mui/icons-material/Search';

function FilterForm({ search, setSearch, price, setPrice, propertyType, setPropertyType, setSearchClicked }) { 
  
  const [sliderValue, setSliderValue] = useState(price);  //a state to hold the current slider value passed down as prop


  //The states of all of the below functions are set in the parent Dashboard component, each method passes it up the tree
  const handleSearchChange = (event) => { //listens for any changes within the search field
    setSearch(event.target.value);
  };

  const handlePriceChange = (event, newValue) => { //listens for any changes within the prive slider
    setSliderValue(newValue.map(v => v * 1000)); 
  };

  const handlePropertyTypeChange = (event) => { //listens for any changes within the type input
    setPropertyType(event.target.value);
  };

  const handleSearchClick = () => { //listens for a click on the search filter button
    setPrice(sliderValue); //sets the price criteria asthe value put in by the user
    setSearchClicked(true);
  };

  const handleResetClick = () => { //resets all the states
    setSearch('');
    setSliderValue([100000, 1000000]); 
    setPropertyType('');
    setSearchClicked(true); 
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
