import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoverHover from '../components/CoverHover';
import CvHover from '../components/CvHover';
import HireVue from '../components/HireVue';
import Navbar from '../components/Navbar';
import Sidecar from '../components/SideNavigation';
import "./Home.css";
import TopJobs from '../components/TopJobs';
import SampleKit from '../components/SampleKit';
import BuddyView from '../components/BuddyView';
// import pic from "./homeback2.jpeg";
// import logo from "./logo1.jpeg";




function Home() {
  let navigate = useNavigate();


  useEffect (() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/prompt")
    }
  }, [])
  return (

      <div>
        <div>
          <Navbar />
      
        </div>
        <div style={{display: "flex"}}>
          {/* make the squares come from left right up down using transform */}
          <Sidecar />
          <div style={{display: "flex", flexWrap: 'wrap'}}>
            <CvHover />
            <CoverHover />
            <HireVue />
            <TopJobs />
            <SampleKit />
            <BuddyView />
          </div> 
        </div>
      </div>

      
  )
}

export default Home