import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uYWxkdWNrOTkiLCJhIjoiY2xqZGNzdXk3MDNvbDNkbnFodG5jdWR5dCJ9.5GPgWSsFONJTHpb5nKWdDA';
//This  map thumbnail is boilerplate provided by Mapbox please refer to the final report documentation for full details
const MapThumbnail = ({ coordinates }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(coordinates[0]); 
  const [lat] = useState(coordinates[1]);  
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/donalduck99/clje5u1ao004c01qsc5rieywy', // Replace this with your Mapbox style
      center: [lng, lat],
      zoom: zoom
    });
  }, [lng, lat, zoom]);

  useEffect(() => {
    if (!map.current || !coordinates) return; // wait for map to initialize and houses to be available


    const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map.current);

      // change cursor to pointer on marker hover
      marker.getElement().addEventListener('mouseover', () => {
        marker.getElement().style.cursor = 'pointer';
      });

      marker.getElement().addEventListener('mouseout', () => {
        marker.getElement().style.cursor = '';
      });

    });
 

  return (
    <div ref={mapContainer} style={{ width: '40vh', height: '30vh'}} />
  );
}

export default MapThumbnail;
