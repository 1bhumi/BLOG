import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleEmail = (e) => {
    setFormData((value) => {
      return { ...value, email: e.target.value };
    });
  };

  const handlePassword = (e) => {
    setFormData((value) => {
      return { ...value, password: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/user/login',
        formData,
        { withCredentials: true }  // Send cookies with the request
      );

      if (response.status === 200) {
        const data = response.data;
        toast.success(data.message);
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Error details:", error);  // Log error details for debugging
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleEmail}
              placeholder="Enter Email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlePassword}
              placeholder="Enter Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
