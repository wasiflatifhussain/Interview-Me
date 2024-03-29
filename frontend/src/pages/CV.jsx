import React, { useEffect, useState } from 'react';
import DropZone from '../components/DropZoneResume';
import Navbar from '../components/Navbar';
import SideNavigation from '../components/SideNavigation';
import CvCards from '../components/CvCards';
import "./CV.css";
import axios from 'axios';

export default function CV() {
  const [cvDatas, setcvDatas] = useState();
  
  useEffect(() => {
    fetchCVData();
  },[])

  const fetchCVData = async () => {
    try {
      const formData = new FormData();
      formData.append('userName',JSON.parse(localStorage.getItem("userName")));
      const response = await axios.get('http://localhost:8000/users/resumes',{params: {userName: JSON.parse(localStorage.getItem("userName"))}});
      console.log(response.data);
      setcvDatas(response.data);
    } catch (err) {
      console.log("error fetching on load");
    }
  }
  
  return (
      <div>
        <div>
          <Navbar />
        </div>
        <div style={{display: "flex"}}>
          <SideNavigation />
          <div style={{display: "flex", flexWrap: 'wrap'}}>
          <DropZone />
          <div class="resumeCol">Saved Resumes:</div>

          {cvDatas && 
            cvDatas.map((cv) => {
              console.log(typeof cv.Key)
              const regex = /[^/]*$/;
              const fileName = cv.Key.match(regex)[0];
              const regex2 = /^\d{4}-\d{2}-\d{2}/;
              const uploadDate = cv.LastModified.match(regex2)[0];
              return (
                <CvCards 
                  fileName={fileName}
                  uploadDate={uploadDate}
                />
              )
            })
          }

          <div>Next steps:
            to each of the file names, add the a href and the link is the localhost get request that downloads the file for that link
          </div>
          </div> 

        </div>
      </div>
  )
}
