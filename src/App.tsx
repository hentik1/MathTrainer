import React, { useState } from 'react';
import './app.css';
import Menu from './menu';
import Settings from './settings';
import Record from './record';

function App() {

  return (
    <>
      <Menu />
      <Settings />
      <Record />
    </>
  );
}

export default App;