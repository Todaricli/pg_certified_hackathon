import React from "react";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Global } from "@emotion/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/carousel/styles.css";
import "@mantine/core/styles.css";
import "./index.css";
import { theme } from "./theme.js"

import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import User from "./pages/User"

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Global
        styles={{
          body: {
            backgroundColor: "#FBF7EF",
            color: "#000",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
          },
        }}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<User />} />
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
