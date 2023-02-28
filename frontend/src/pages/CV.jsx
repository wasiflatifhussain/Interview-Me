import React from 'react';
import DropZone from '../components/DropZone';
import Navbar from '../components/Navbar';
import SideNavigation from '../components/SideNavigation';

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
            <DropZone />
            {/* <UploadFiles /> */}
          <div>Next steps:
            first get the data from s3 and make cards for each cv with view and "analyse" options
            allow max 5 cv or something
            if deletes cv, then delete it from s3
          </div>
          </div> 

        </div>
      </div>
  )
}
