import React, { useState, useEffect, useRef } from 'react';
import DescriptionPanel from './DescriptionPanel';
import BarChart from './BarChart';
import MyResponsiveLine from './LineChart';
import SocialAnalytics from '../SecondPanel/SocialAnalytics';
import getDistancesAndScores from '../MapUtil/MapFunctions';
import PropertyInformation from './PropertyInformation';
import axios from 'axios';

const FinancialAnalytics = ({ houseData, setSelectedHouse }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showSocialAnalytics, setShowSocialAnalytics] = useState(false);
    const panelRef = useRef(); 
    const [scoreAndDistance, setScoreAndDistance] = useState(null);
    const [images, setImages] = useState([]);


    useEffect(() => {
      async function fetchData() {
          if (houseData) {
              console.log(houseData.longitude, houseData.latitude); 
              const result = await getDistancesAndScores(houseData.longitude, houseData.latitude);
              setScoreAndDistance(result);
              
              try {
                  const response = await axios.get(`/api/property-images/property/${houseData.id}`);
                  const imagePaths = response.data.map(image => image.imagePath);
                  setImages(imagePaths);
              } catch (error) {
                  console.error("Failed to fetch property images: ", error);
              }
  
              setIsVisible(true);
          } else {
              setIsVisible(false);
          }
      }
      fetchData();
  }, [houseData]);
  
    

    useEffect(() => {
      function handleClickOutside(event) {
          if (panelRef.current && !panelRef.current.contains(event.target)) {
            setSelectedHouse(null);
            setIsVisible(false);
            setShowSocialAnalytics(false); // Resetting the showSocialAnalytics state
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setSelectedHouse]); // include setSelectedHouse in the dependency array


    return (
      <div ref={panelRef} className={`panel ${isVisible ? 'panel-visible' : ''}`}>
        {showSocialAnalytics ? (
          <SocialAnalytics 
            socialData={houseData && scoreAndDistance ? {houseData: houseData, scoreAndDistance: scoreAndDistance} : null} 
            setShowSocialAnalytics={setShowSocialAnalytics} 
          />
        ) : (
          <>

            <PropertyInformation 
              houseData={houseData} 
              images={images} 
              scoreAndDistance={scoreAndDistance} 
              setShowSocialAnalytics={setShowSocialAnalytics} 
            />
            <DescriptionPanel 
              description={houseData && houseData.propertyDescription} 
              coordinates={houseData && [houseData.longitude, houseData.latitude]} 
            />
            
            {houseData && <BarChart currentHousePrice={houseData.price} neighborhoodId={houseData.neighborhoodId}/>}

            {houseData && <MyResponsiveLine propertyId={houseData.id}/>}

          </>
        )}
      </div>
    );
};
  
export default FinancialAnalytics;
