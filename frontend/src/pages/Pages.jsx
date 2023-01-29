import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';

function Pages() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default Pages