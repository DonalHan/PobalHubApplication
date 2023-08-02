//This component is the primary functionality for generating the MapBox App, most of which is boiler plate from the following documentation:
//https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import FinancialAnalytics from '../FirstPanel/FinancialAnalytics';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uYWxkdWNrOTkiLCJhIjoiY2xqZGNzdXk3MDNvbDNkbnFodG5jdWR5dCJ9.5GPgWSsFONJTHpb5nKWdDA';

function MapApp({ properties }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]); //state to store the markers
  const [lng, setLng] = useState(-6.266155);
  const [lat, setLat] = useState(53.350140);
  const [zoom, setZoom] = useState(12);
  const [selectedHouse, setSelectedHouse] = useState(null); // a state to keep track of what property the user has clicked on

  useEffect(() => {
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/donalduck99/clje5u1ao004c01qsc5rieywy',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current || !properties) return;

    // Remove the current markers from the map
    markers.current.forEach(marker => marker.remove());
    markers.current = []; // Reset the markers array

    properties.forEach(property => { // for each property create a marker
      const marker = new mapboxgl.Marker() //mapbox's markers feature 
        .setLngLat([property.longitude, property.latitude])
        .addTo(map.current); // add to map

      // Add the current marker to our state/list of markers
      markers.current.push(marker);

      //add an event listener for the current marker which changes the cursor style when over a marker
      marker.getElement().addEventListener('mouseover', () => {
        marker.getElement().style.cursor = 'pointer';
      });

      //add an event listener for the current marker which changes the cursor style when not on a marker
      marker.getElement().addEventListener('mouseout', () => {
        marker.getElement().style.cursor = '';
      });

      //add an event listener for the current marker which, when click, saves the current property in a state, to be passed down the tree later
      marker.getElement().addEventListener('click', () => { 
        setSelectedHouse(property);
      });
    });
  }, [properties]); //dependency is when the properties list changes (such as when it is filtered)
 
  return (
    <>
      <FinancialAnalytics setSelectedHouse={setSelectedHouse} houseData={selectedHouse} />
      <div ref={mapContainer} className="map-container" />
    </>
  );
}

export default MapApp;