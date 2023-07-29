import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import MapApp from './MapApp';
import HouseList from './HouseList';
import { Box } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState([100000, 1000000]);
  const [propertyType, setPropertyType] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [filteredHouses, setFilteredHouses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/properties');
        const housesWithImages = await Promise.all(
          response.data.map(async (house) => {
            const imgResponse = await axios.get(`/api/property-images/property/${house.id}`);
            return { ...house, image: imgResponse.data[0]?.imagePath };
          })
        );
        setProperties(housesWithImages);
      } catch (error) {
        console.error('Error fetching properties', error);
        console.log('Error details:', error.response);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchClicked) {
      const newFilteredHouses = properties.filter(property => {
        let matchesSearch = true;
        let matchesPrice = true;
        let matchesPropertyType = true;

        if (search !== '') {
          matchesSearch = property.address.includes(search);
        }
      
        if (price !== null) {
          matchesPrice = property.price >= price[0] && property.price <= price[1];
        }
      
        if (propertyType !== '') {
          matchesPropertyType = property.type === propertyType;
        }

        return matchesSearch && matchesPrice && matchesPropertyType;
      });

      setFilteredHouses(newFilteredHouses);
      setSearchClicked(false);
    }
  }, [search, price, propertyType, searchClicked, properties]);

  if (isLoading) {
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
        <MapApp properties={filteredHouses.length > 0 ? filteredHouses : properties} />
        <HouseList houses={filteredHouses.length > 0 ? filteredHouses : properties} setSearchClicked={setSearchClicked} />
      </Box>
    </Box>
  );
}

export default Dashboard;
