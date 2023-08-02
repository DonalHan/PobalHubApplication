/*This file is responsible for the main dashboard or home page of the pobal hub applicaiton*/
import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import MapApp from './MapApp';
import HouseList from './HouseList';
import { Box } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  // The use states responsible for storing a variety of states passed down the component tree
  const [properties, setProperties] = useState([]); //used to store the list of properties
  const [isLoading, setIsLoading] = useState(true); //a state to explain to the user all the data is being aquired
  const [search, setSearch] = useState(''); //used to store the user search from the filter form
  const [price, setPrice] = useState([100000, 1000000]); //used to set the price of the slider component in the filter form
  const [propertyType, setPropertyType] = useState(''); //used to set the property type in the filter form
  const [searchClicked, setSearchClicked] = useState(false); //used to keep track of the search button being clicked in the filter form, triggers logic & refresh if true
  const [filteredHouses, setFilteredHouses] = useState([]); //stores the filtered house based on filter criteria

  //A use effect that is responsible for a back end axios call that retrieves all of the data for the application
  useEffect(() => {
    //an asynchronous method that retrieves all of the housing data from the backend
    const fetchData = async () => { 
      
      try {
        const response = await axios.get('/api/properties'); // an axios call that retrieves all properties.  Await pauses the function whilst all this data is retrieved
       
        const housesWithImages = await Promise.all( //Another axios call that has a promise (a certainty) which retrieves all the houses images and adds them to each object
          response.data.map(async (house) => { // .map takes every house and performs and operation on it
            const imgResponse = await axios.get(`/api/property-images/property/${house.id}`); // the operation at hand is an axios call that retrieves each houses images
            return { ...house, image: imgResponse.data[0]?.imagePath }; //returns each house with new image attributes including its own native ones (...spread operator)
          })
        );
        setProperties(housesWithImages); //once all the data is retrieved store it properties state
      } catch (error) { //error handling
        console.error('Error fetching properties', error);
        console.log('Error details:', error.response);
      } finally {
        setIsLoading(false); //once the data is retrieved, the loading screen can be removed
      }
    };
    fetchData(); //call the fetch data function
  }, []);

  //This use effect is repsonsible for keeping track of the search button being clicked and filtering the components with the user criteria
  useEffect(() => { 
    if (searchClicked) {
      //This method uses .filter which takes the properties state and filters them based on the below criteria
      const newFilteredHouses = properties.filter(property => {
        //first instantiate each search field as true
        let matchesSearch = true; 
        let matchesPrice = true;
        let matchesPropertyType = true;

        if (search !== '') { //if this field is  populated
          matchesSearch = property.address.includes(search); //make matchSearch true/false if the current property address includes the same input as the user
        }
      
        if (price !== null) {//if this field is  populated
          matchesPrice = property.price >= price[0] && property.price <= price[1];  //make matchesPrice true/false if the current price matches the same input as the user
        }
      
        if (propertyType !== '') { //if this field is  populated
          matchesPropertyType = property.type === propertyType; //make matchesPropertyType true/false if the current property address includes the same input as the user
        }

        return matchesSearch && matchesPrice && matchesPropertyType; // if all are true, the property will be added to the new list, if any are false, the filter function excludes it
      });

      setFilteredHouses(newFilteredHouses); //set the filtered list
      setSearchClicked(false); //reset the search button
    }
  }, [search, price, propertyType, searchClicked, properties]);

  if (isLoading) { //used to inform the user the applicaiton is still loading data and components
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Box sx={{ flex: 1 }}>
        <Sidebar
          search={search}
          setSearch={setSearch}
          price={price}
          setPrice={setPrice}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          setSearchClicked={setSearchClicked}
        />
      </Box>
      <Box sx={{ display: 'flex', flex: 3, borderRadius: 2, alignItems: 'center', overflow: 'hidden', m: 2, marginTop: '6%', height: '80vh' }}>
         {/*using a ternary operaty to decide hther a filtered list or full list gets passed in as prop*/}
        <MapApp properties={filteredHouses.length > 0 ? filteredHouses : properties} />
        <HouseList houses={filteredHouses.length > 0 ? filteredHouses : properties} setSearchClicked={setSearchClicked} />
      </Box>
    </Box>
  );
}

export default Dashboard;
