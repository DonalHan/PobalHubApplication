import { distance, point } from '@turf/turf';

// Your Mapbox access token
const mapboxAccessToken = 'pk.eyJ1IjoiZG9uYWxkdWNrOTkiLCJhIjoiY2xqZGNzdXk3MDNvbDNkbnFodG5jdWR5dCJ9.5GPgWSsFONJTHpb5nKWdDA';

const getDistanceToPlace = async (longitude, latitude, place) => {
  const userLocation = point([longitude, latitude]);

  return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?proximity=${longitude},${latitude}&access_token=${mapboxAccessToken}`)
    .then(response => response.json())
    .then(data => {
      // Get coordinates of first place in the response and calculate the distance
      if (data.features && data.features.length > 0) {
        const placeLocation = point(data.features[0].geometry.coordinates);
        const distanceToPlace = distance(userLocation, placeLocation);
        return parseFloat(distanceToPlace.toFixed(1));
      } else {
        console.log(`No ${place} found`);
        return null;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
};

const calculateScore = (distance, thresholds) => {
  for (let i = 0; i < thresholds.length; i++) {
    if (distance <= thresholds[i]) {
      return 20 - (i * 4);
    }
  }
  return 0;
};

const getDistancesAndScores = async (longitude, latitude) => {
  console.log('Entered getDistancesAndScores', longitude, latitude);
  const shopDistance = await getDistanceToPlace(longitude, latitude, 'grocery');
  const parkDistance = await getDistanceToPlace(longitude, latitude, 'park');
  const cityDistance = await getDistanceToPlace(longitude, latitude, 'city');
  const busDistance = await getDistanceToPlace(longitude, latitude, 'bus');

  const shopScore = calculateScore(shopDistance, [1, 2, 3, 4, 5]);
  const parkScore = calculateScore(parkDistance, [1, 2, 3, 4, 5]);
  const cityScore = calculateScore(cityDistance, [3, 5, 10, 15, 20]);
  const busScore = calculateScore(busDistance, [0.5, 1, 2, 3, 4]);

  // Hard-coded crime score
  const crimeScore = 10;

  return {
    distances: {
      shop: shopDistance,
      park: parkDistance,
      city: cityDistance,
      bus: busDistance,
    },
    scores: {
      total: shopScore + parkScore + cityScore + busScore + crimeScore,
      shop: shopScore,
      park: parkScore,
      city: cityScore,
      bus: busScore,
      crime: crimeScore,
    },
  };
};

export default getDistancesAndScores;
