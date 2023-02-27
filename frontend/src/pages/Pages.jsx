import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Prompt from './Prompt';
import Register from './Register';
import CV from "./CV";


function Pages() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/cv" element={<CV />} />
    </Routes>
  )
}

export default Pages