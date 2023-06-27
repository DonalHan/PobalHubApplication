import React from 'react';
import Sidebar from './Sidebar';
import MapApp from './MapApp';


function Dashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      <div style={{ flex: '1' }}>
        <Sidebar />
      </div>

      <div style={{ flex: '3' }}>
        <MapApp/>
      </div>
     
    </div>
  );
  }
  export default Dashboard;