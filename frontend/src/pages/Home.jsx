import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidecar from '../components/SideNavigation';
// import "./Home.css";
// import pic from "./homeback2.jpeg";
// import logo from "./logo1.jpeg";




function Home() {
  let navigate = useNavigate();
  const handleLogin = () => {
    let path = "/login";
    navigate(path);
  }
  const handleRegister = () => {
    let path = "/register";
    navigate(path);
  } 

  useEffect (() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/prompt")
    }
  }, [])
  return (

      <div>
        
        <Navbar />
        <Sidecar />
        {/* Home */}
        
      </div>

      
  )
}

export default Home