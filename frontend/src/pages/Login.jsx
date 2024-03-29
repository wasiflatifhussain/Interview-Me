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
    try {
      const url = "http://localhost:8000/users/login";
      const res = await Axios.post(url,user)
      console.log(res.data.token)
      console.log("Success") 
      navigate("/")
      localStorage.setItem("userName",JSON.stringify(res.data.email));
      console.log(res.data.email)
      localStorage.setItem("TOKEN",res.data.token);
      // sessionStorage.setItem("token", res.data.token);
    } catch (error) { 
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
          console.log(error.response.data.message)
        }
        console.log("Error")
    }

		// try {
		// 	const url = "http://localhost:8000/users/login";
		// 	const res = await Axios.post(url, user);
    //   console.log("RECEIVED TOKEN: " + res.data.token)
		// 	sessionStorage.setItem("token", res.data.token);
		// 	// window.location = "/";
    //   navigate("/")
		// } catch (error) {
		// 	if (
		// 		error.response &&
		// 		error.response.status >= 400 &&
		// 		error.response.status <= 500
		// 	) {
		// 		console.log(error.response.data.message);
		// 	}
		// }



    
  }

  return (
      <div>
      <div className='master2l'></div>
      <div className="masterl">
          <div className="loginForml">
              <div className="signInl">Sign-In</div>
              <form className="signInForml" onSubmit={handleSubmit}>
                  <input type="email" name="email" placeholder="Username or Email Address" className="inputFieldsl" onChange={handleChange} value={user.email} required />
                  <input type="password" name="password" placeholder="Password" className="inputFieldsl" onChange={handleChange} value={user.password} required />
                  <input type="submit" className="join-btnl" value="Sign In" />
              </form>
              
          </div>
          <div className='signUpPromptl'><div style={{paddingBottom: "20px"}}>Not a </div><div>member yet?</div><input type="submit" className="join-btn2l" value="Sign Up" onClick={handleRegister} /></div>
      </div>
      </div>

  )
}

export default Logging;