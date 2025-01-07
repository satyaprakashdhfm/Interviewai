import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Passwordinput from '../input/Passwordinput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import './signup.css';
import img2 from './inter.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError('Please enter your name');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
      });

      setIsLoading(false);

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        setSuccessMessage('Account created successfully!');
        localStorage.setItem('token', response.data.accessToken);

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <img className="image" src={img2} alt="Illustration" />
        <div className="flex items-center justify-center mt-28">
          {/* Gradient Border Wrapper */}
          <div className="w-96 p-[2px] rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            {/* Inner Form Container */}
            <div className="rounded-lg bg-white px-7 py-20">
              <form onSubmit={handleSignup}>
                <h1 className="Main text-2xl font-semibold mb-7 text-center">Signup</h1>

                {/* Input with Gradient Border */}
                <div className="p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 bg-white rounded-lg outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full p-3 bg-white rounded-lg outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Input with Gradient Border */}
                <Passwordinput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Error and Success Messages */}
                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                {successMessage && <p className="text-green-500 text-xs pb-1">{successMessage}</p>}

                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-sm text-center mt-4">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-primary underline">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
