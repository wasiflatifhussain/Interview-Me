import React from 'react';
import "./Login.css";
import { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function Logging() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = ({currentTarget: input}) => {
    setUser({...user,[input.name]: input.value})
  }

  function handleRegister() {
      let path = "/register";
      navigate(path);
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (email !== "" && password !== "") {
    //     setUser(prev => {
    //         return {
    //             emailAdd: email,
    //             passwordAdd: password
    //         };
    //     }
    //     )
        // console.log(user) 
    try {
      const url = "http://localhost:8000/users/login";
      const response = await Axios.post(url,user)
      // await fetch(url, {
      //   method: 'POST',
      //   mode: 'cors',
      //   body: JSON.stringify(user)
        
      // })
      console.log(response?.data)
      console.log("Success")
    } catch { 
        console.log("error")
    }



    
  }

  return (
      <div>
      <div className='master2'></div>
      <div className="master">
          <div className="loginForm">
              <div className="signIn">Sign-In</div>
              <form className="signInForm" onSubmit={handleSubmit}>
                  <input type="text" name="email" placeholder="Username or Email Address" className="inputFields" onChange={handleChange} value={user.email} />
                  <input type="password" name="password" placeholder="Password" className="inputFields" onChange={handleChange} value={user.password} />
                  <input type="submit" className="join-btn" value="Sign In" />
              </form>
              
          </div>
          <div className='signUpPrompt'>Not a member yet? <input type="submit" className="join-btn2" value="Sign Up" onClick={handleRegister} /></div>
      </div>
      </div>

  )
}

export default Logging;