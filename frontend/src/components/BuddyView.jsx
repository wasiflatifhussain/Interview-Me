import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./BuddyView.css";

export default function BuddyView() {
  let navigate = useNavigate();
  const buddyHandler = () => {
    let path = "/buddyview";
    navigate(path);
  }
  return (
    <div className='buddy interview' onClick={buddyHandler}></div>
  )
}
