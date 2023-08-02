import React, { useState, useEffect, useRef } from 'react';
import DescriptionPanel from './DescriptionPanel';
import BarChart from './BarChart';
import MyResponsiveLine from './LineChart';
import SocialAnalytics from '../SecondPanel/SocialAnalytics';
import getDistancesAndScores from '../MapUtil/MapFunctions';
import PropertyInformation from './PropertyInformation';

const FinancialAnalytics = ({ houseData, setSelectedHouse }) => {
    const [isVisible, setIsVisible] = useState(false); // a state that determines whther the financial analytics panel should be shown or not
    const [showSocialAnalytics, setShowSocialAnalytics] = useState(false); // a state that determines whether the social analytics panel should be shown or not
    const panelRef = useRef(); // a reference hook used to check whether the user has clicked off the panel or not
    const [scoreAndDistance, setScoreAndDistance] = useState(null); //state to store the score
    const [images, setImages] = useState([]); // state to store the property image  

    useEffect(() => { //a user effect to get the social scores for the property passed  in
      async function fetchData() {
          if (houseData) {
              const result = await getDistancesAndScores(houseData.longitude, houseData.latitude); //calling the utility function
              setScoreAndDistance(result); //set the score in the state
              setIsVisible(true); // set the visibility pannel true
          } else {
              setIsVisible(false); //if theres no house data to laod, keep the panel invisible
          }
      }
      fetchData(); // call the function
  }, [houseData]);


    // A use effecct hook that gets the propery images and maps them to the images state
    useEffect(() => {
      if (houseData && houseData.propertyImages) {
        const imagePaths = houseData.propertyImages.map(img => img.imagePath);
        setImages(imagePaths); //set the state with mapped images
      }
    }, [houseData]);


    // This use effect checks is the user has clicked outside the pannel
    useEffect(() => {
      function handleClickOutside(event) {
          if (panelRef.current && !panelRef.current.contains(event.target)) { //checks if the reference is populated and that the event (click) was not on the reference (panel)
            setSelectedHouse(null); //resets the state of the house
            setIsVisible(false); //sets visibility as false
            setShowSocialAnalytics(false); // Resetting the showSocialAnalytics state
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setSelectedHouse]); // include setSelectedHouse in the dependency array


    return (
      <div ref={panelRef} className={`panel ${isVisible ? 'panel-visible' : ''}`}> {/* if is visible is true, the css class activates the visibile styling, if false it removes it*/}
        {/* if show analytics state is true, then SocialAnalytics component is shown. If its false, the financial analytics components are shown: PropertyInformation, DescriptionPanel, BarChart, MyResponsiveLine*/}
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
