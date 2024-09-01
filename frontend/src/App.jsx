import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Global } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./providers/UserProvider.jsx";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "./index.css";
import { theme } from "./theme.js"
import PetHouse from './pages/PetHouse';
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import User from "./pages/User"
import Map from "./pages/Map"

export default function App() {
  return (
    <UserProvider>
      <MantineProvider theme={theme}>
        <Global
          styles={{
            body: {
              backgroundColor: "#FBF7EF",
              color: "#000",
              margin: 0,
              padding: 0,
              boxSizing: "border-box",
              fontFamily: 'Verdana, sans-serif, Cerebri Sans, Calibri',
          },
          }}
        />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/map" element={<Map />} />
            <Route path="/login" element={<Login />} />

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
    </UserProvider>
  );
}
