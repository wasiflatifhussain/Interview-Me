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
      const res = await Axios.post(url,user)
      // await fetch(url, {
      //   method: 'POST',
      //   mode: 'cors',
      //   body: JSON.stringify(user)
        
      // })
      console.log(res.data.token)
      console.log("Success") 
      navigate("/")
      localStorage.setItem("TOKEN",res.data.token);
    } catch (error) { 
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          console.log(error.response.data.message)
        }
        console.log("Error")
    }



    
  }

  return (
      <div>
      <div className='master2l'></div>
      <div className="masterl">
          <div className="loginForml">
              <div className="signInl">Sign-In</div>
              <form className="signInForml" onSubmit={handleSubmit}>
                  <input type="text" name="email" placeholder="Username or Email Address" className="inputFieldsl" onChange={handleChange} value={user.email} />
                  <input type="password" name="password" placeholder="Password" className="inputFieldsl" onChange={handleChange} value={user.password} />
                  <input type="submit" className="join-btnl" value="Sign In" />
              </form>
              
          </div>
          <div className='signUpPromptl'><div style={{paddingBottom: "20px"}}>Not a </div><div>member yet?</div><input type="submit" className="join-btn2l" value="Sign Up" onClick={handleRegister} /></div>
      </div>
      </div>

  )
}

export default Logging;