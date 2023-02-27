import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./TopJobs.css";

export default function TopJobs() {
  let navigate = useNavigate();
  const topjobs = () => {
    let path = "/jobs";
    navigate(path);
  }
  return (
    <div className='top moveit' onClick={topjobs}></div>
  )
}
