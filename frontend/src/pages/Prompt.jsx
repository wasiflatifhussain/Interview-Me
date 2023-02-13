import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Prompt.css";
import pic from "./homeback3.jpeg";
import logo from "./logo1.jpeg";

function Prompt() {
  let navigate = useNavigate();
  const handleLogin = () => {
    let path = "/login";
    navigate(path);
  }
  const handleRegister = () => {
    let path = "/register";
    navigate(path);
  } 
  return (
    <div style={{display: "flex"}} className="mother">
      
      <img src={pic} alt="back-img" className='backImg' />
      <p className="logo1"><p style={{color:"#43544a", padding: "0", margin:"0"}}>Interview-</p>Me</p>
      <p className="quotes">The One-Stop Interview Preparation Platform.</p>
      <div className="buttons">
        <p className="signPrompt">Please login or sign-up to use your Interview-Me Portal</p>
        <input type="submit" value="Login" onClick={handleLogin} className="loginBtn" />
        <input type="submit" value="Sign-Up" onClick={handleRegister} className="registerBtn" />
      </div>
    </div>
  )
}

export default Prompt