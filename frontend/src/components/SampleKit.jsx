import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./SampleKit.css";

export default function SampleKit() {
  let navigate = useNavigate();
  const kitHandler = () => {
    let path = "/prepkit";
    navigate(path);
  }
  return (
    <div className='prep kit' onClick={kitHandler}></div>
  )
}
