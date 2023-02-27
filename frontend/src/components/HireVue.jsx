import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./HireVue.css";

export default function HireVue() {
  let navigate = useNavigate();
  const hireHandler = () => {
    let path = "/interview";
    navigate(path);
  }
  return (
    <div className='hire moveit' onClick={hireHandler}></div>
  )
}
