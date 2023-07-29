import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import FinancialAnalytics from '../FirstPanel/FinancialAnalytics';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uYWxkdWNrOTkiLCJhIjoiY2xqZGNzdXk3MDNvbDNkbnFodG5jdWR5dCJ9.5GPgWSsFONJTHpb5nKWdDA';

function MapApp({ properties }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]); // New state to store the markers
  const [lng, setLng] = useState(-6.266155);
  const [lat, setLat] = useState(53.350140);
  const [zoom, setZoom] = useState(12);
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
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

    // Remove existing markers from the map
    markers.current.forEach(marker => marker.remove());
    markers.current = []; // Reset the markers array

    properties.forEach(property => {
      const marker = new mapboxgl.Marker()
        .setLngLat([property.longitude, property.latitude])
        .addTo(map.current);

      // Add the marker to our array of markers
      markers.current.push(marker);

      marker.getElement().addEventListener('mouseover', () => {
        marker.getElement().style.cursor = 'pointer';
      });

      marker.getElement().addEventListener('mouseout', () => {
        marker.getElement().style.cursor = '';
      });

      marker.getElement().addEventListener('click', () => {
        setSelectedHouse(property);
      });
    });
  }, [properties]);
 
  return (
    <>
      <FinancialAnalytics setSelectedHouse={setSelectedHouse} houseData={selectedHouse} />
      <div ref={mapContainer} className="map-container" />
    </>
  );
}

export default MapApp;