import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { houses } from './Houses'; // Please replace with the correct path to Houses.js

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9uYWxkdWNrOTkiLCJhIjoiY2xqZGNzdXk3MDNvbDNkbnFodG5jdWR5dCJ9.5GPgWSsFONJTHpb5nKWdDA';

function MapApp() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const panelRef = useRef(null);
  const [lng, setLng] = useState(-6.266155);
  const [lat, setLat] = useState(53.350140);
  const [zoom, setZoom] = useState(12);
  const [isPanelVisible, setPanelVisible] = useState(false);

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
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setPanelVisible(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelRef]);

  useEffect(() => {
    if (!map.current || !houses) return; // wait for map to initialize and houses to be available
  
    houses.forEach(house => {
      // create a marker for each feature and add it to the map
      const marker = new mapboxgl.Marker()
        .setLngLat(house.coordinates)
        .addTo(map.current);

      // change cursor to pointer on marker hover
      marker.getElement().addEventListener('mouseover', () => {
        marker.getElement().style.cursor = 'pointer';
      });

      marker.getElement().addEventListener('mouseout', () => {
        marker.getElement().style.cursor = '';
      });
      // add an event listener to the marker
      marker.getElement().addEventListener('click', () => {
        setPanelVisible(true);
      });
  
    });
  }, []);
  
  return (
    <>
      <div ref={panelRef} className={`panel ${isPanelVisible ? 'panel-visible' : ''}`}>
        <h1>House Details</h1>
        {/* More information to come */}
      </div>
      <div ref={mapContainer} className="map-container" />
    </>
  );
}

export default MapApp;