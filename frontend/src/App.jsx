import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import RandomPage from './pages/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/random" element={<RandomPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


