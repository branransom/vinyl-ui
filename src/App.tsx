import React from 'react';
import SearchContainer from './containers/SearchContainer';
import SideBar from './containers/SideBar';

import './App.css';

const App = () => (
  <div className="container">
    <SideBar />
    <SearchContainer />
  </div>
);

export default App;
