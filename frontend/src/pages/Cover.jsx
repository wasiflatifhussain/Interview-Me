import React, { useEffect, useState } from 'react';
import DropZone from '../components/DropZoneCover';
import Navbar from '../components/Navbar';
import SideNavigation from '../components/SideNavigation';
import CoverCards from '../components/CoverCards';
import "./Cover.css";
import axios from 'axios';


export default function Cover() {
  const [coverDatas, setcoverDatas] = useState();
  
  useEffect(() => {
    fetchCoverData();
  },[])

  const fetchCoverData = async () => {
    try {
      const formData = new FormData();
      formData.append('userName',JSON.parse(localStorage.getItem("userName")));
      const response = await axios.get('http://localhost:8000/users/covers',{params: {userName: JSON.parse(localStorage.getItem("userName"))}});
      console.log(response.data);
      setcoverDatas(response.data);
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
          <div class="resumeCol">Saved Cover Letters:</div>
          {coverDatas && 
            coverDatas.map((cover) => {
              console.log(typeof cover.Key)
              const regex = /[^/]*$/;
              const fileName = cover.Key.match(regex)[0];
              const regex2 = /^\d{4}-\d{2}-\d{2}/;
              const uploadDate = cover.LastModified.match(regex2)[0];
              return (
                <CoverCards 
                  fileName={fileName}
                  uploadDate={uploadDate}
                />
              )
            })
          }
          <div>Next steps:
            first get the data from s3 and make cards for each cover with view and "analyse" options
            allow max 5 cover or something
            if deletes cover, then delete it from s3
          </div>
          </div> 

        </div>
      </div>
  )
}
