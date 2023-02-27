import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CvHover.css";

export default function CvHover() {
  let navigate = useNavigate();
  const cvHandler = () => {
    let path = "/cv";
    navigate(path);
  }
  return (
    <div className='cv mover' onClick={cvHandler}></div>
  )
}
