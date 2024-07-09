import React from 'react';
import GrowthCalculator from './GrowthCalculator';
import logo from './otech_logo.webp';

function App() {
  return (
    <div className="App">
      <header style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Company Logo" style={{ width: 150, marginLeft: 15, marginRight: 7 }} /> 
        <h1>Growth Calculator</h1>
      </header>
      <main>
        <GrowthCalculator />
      </main>
    </div>
  );
}

export default App;