import React from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Global } from '@emotion/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/carousel/styles.css';
import './index.css'

import Home from './pages/Home/Home';
import Login from './pages/Login';
import PetHouse from './pages/PetHouse';

export default function App() {
  return (
    <MantineProvider 
      theme={{
        colorScheme: 'dark',
        colors: {
          brand: [
            '#f0f0f0', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080', '#606060', '#404040', '#202020', '#101010', '#000000',
          ],
        },
        primaryColor: 'brand',
        fontFamily: 'Verdana, sans-serif', 
      }}
    >
      <Global
        styles={{
          body: {
            backgroundColor: '#FBF7EF',
            color: '#000', // Adjust this as needed
            fontFamily: 'Verdana, sans-serif', // Ensure global font is consistent
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pet-house" element={<PetHouse />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </MantineProvider>
  );
}
