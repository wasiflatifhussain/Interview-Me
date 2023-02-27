import React from 'react'
import Navbar from '../components/Navbar'
import SideNavigation from '../components/SideNavigation'

export default function CV() {
  return (
      <div>
        <div>
          <Navbar />
      
        </div>
        <div style={{display: "flex"}}>
          {/* make the squares come from left right up down using transform */}
          <SideNavigation />
          <div style={{display: "flex", flexWrap: 'wrap'}}>
            {/* <CvHover />
            <CoverHover />
            <HireVue />
            <TopJobs />
            <SampleKit />
            <BuddyView /> */}
          </div> 
        </div>
      </div>
  )
}
