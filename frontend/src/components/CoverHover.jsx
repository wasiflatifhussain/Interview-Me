import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CoverHover.css";


export default function CoverHover() {
  let navigate = useNavigate();
  const coverHandler = () => {
    let path = "/covers";
    navigate(path);
  }
  return (
    <div className='cover moveit' onClick={coverHandler}></div>
  )
}
