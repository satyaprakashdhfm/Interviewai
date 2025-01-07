// src/components/Login.js
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Navbar from '../Navbar/Navbar';
import { validateEmail } from '../utils/helper';
import PasswordInput from '../input/Passwordinput';
import './Login.css'
import img1 from './heroimg.png'
// import img2 from './inter.png' 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    try{
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password
      });
      if(response.data && response.data.accessTocken ){
        localStorage.setItem("token",response.data.accessTocken)
        navigate('/dashboard')
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An unexpected error occured please try again")
      }
    }

    
  };

  return (
  <div >
     <Navbar />
        <div className='display-flex flex-row'>
           
            <div>
                 <div className='flex flex-start gap-40  '>
                 <img className="bot-image"src={img1} alt='image11'/>
<div className="flex items-center justify-center mt-28">
  {/* Gradient Border Wrapper */}
  <div className="w-96 p-[2px] rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
    {/* Inner White Box */}
    <div className="rounded-lg bg-white px-7 py-20">
      <form onSubmit={handleLogin}>
        <h1 className="text-2xl font-semibold mb-7 text-center">Login</h1>

        {/* Input Box with Gradient Border */}
        <div className="p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white outline-none"
          />

        {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

        <button type="submit" className="learn-more mt-4">
          <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
          </span>
          <span className="button-text">Login</span>
        </button>

        <p className="text-sm text-center mt-7">
          Not registered yet?{' '}
          <Link to="/signup" className="text-xl text-primary underline">
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  </div>
</div>

    </div>          
          </div>
       
    </div>
    </div>
 
)}

export default Login;
