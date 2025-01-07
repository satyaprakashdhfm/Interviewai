import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import hero from './image1.jpg';
import Navbar from '../Navbar/Navbar';
import './hero.css';

const Hero = () => {
    const navigate = useNavigate(); 

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className="card">
          <div className="bg"></div>
          <div className="blob"></div>
          <img className="heroimg" src={hero} alt="Hero" />
        </div>
                <div>
                    <div className='Content-Container'>
                        <div className='content'>
                        
                       <h1>Welcome To </h1>
                       <h1><span>CareerBoost</span></h1>
                       <p>Master your interview skills, enhance your resume, and land your dream job.</p>
            
                      </div>
            <div className='buttoncon'>
               <button className="learn-more" onClick={() => navigate('/login')}>
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Login</span>
                    </button>

                    <button className="button learn-more" onClick={() => navigate('/signup')}>
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Signup</span>
                    </button>

                </div>

                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Hero;
