import { distance, point } from '@turf/turf';

const mapboxAccessToken = 'pk.eyJ1IjoiZG9uYWxkdWNrOTkiLCJhIjoiY2xqZGNzdXk3MDNvbDNkbnFodG5jdWR5dCJ9.5GPgWSsFONJTHpb5nKWdDA';

const getDistanceToPlace = async (longitude, latitude, place) => { //This method is used to retrieve the distance of a place from a house using mapbox and turf as the methods of calculating
  const houseLocation = point([longitude, latitude]); //Converting the house coordinates into the geoJSON point using turf
 //Main mabox call that finds the closest location to passed in co-ordinates
  return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=${longitude},${latitude}&access_token=${mapboxAccessToken}`) 
    .then(response => response.json())
    .then(data => {

      if (data.features && data.features.length > 0) {
        const placeLocation = point(data.features[0].geometry.coordinates); //Converting the place coordinates into the geoJSON point using turf
        const distanceToPlace = distance(houseLocation, placeLocation); //Getting the distance between the two points using turf
        return parseFloat(distanceToPlace.toFixed(1)); //Parse the returned distance into a float and fix the decimal to one place.
      } else {
        console.log(`No ${place} found`); //error handling 
        return null;
      }
    })
    .catch(error => {
      console.error('Eror:', error); //error handling
      throw error;
    });
};

const calculateScore = (distance, thresholds) => { //This function calculates a score based on an array of distances passed in
  for (let i = 0; i < thresholds.length; i++) {
    if (distance <= thresholds[i]) {
      return 20 - (i * 4); //The score starts out with 20, and as the distance increases, the dedction from the score increases
    }
  }
  return 0;
};

const getDistancesAndScores = async (longitude, latitude) => { //call all the methods to get the distance and calculate the score
  console.log('Entered getDistancesAndScores', longitude, latitude);
  const shopDistance = await getDistanceToPlace(longitude, latitude, 'grocery');
  const parkDistance = await getDistanceToPlace(longitude, latitude, 'park');
  const cityDistance = await getDistanceToPlace(longitude, latitude, 'dublin');
  const busDistance = await getDistanceToPlace(longitude, latitude, 'bus');

  const shopScore = calculateScore(shopDistance, [1, 2, 3, 4, 5]);
  const parkScore = calculateScore(parkDistance, [1, 2, 3, 4, 5]);
  const cityScore = calculateScore(cityDistance, [3, 5, 10, 15, 20]);
  const busScore = calculateScore(busDistance, [0.5, 1, 2, 3, 4]);



  return { //return an object with th edistances and the score to be passed into the UI
    distances: {
      shop: shopDistance,
      park: parkDistance,
      city: cityDistance,
      bus: busDistance,
    },
    scores: {
      total: shopScore + parkScore + cityScore + busScore,
      shop: shopScore,
      park: parkScore,
      city: cityScore,
      bus: busScore,
    },
  };
};

export default getDistancesAndScores;
