import React from'react';
import axios from "axios"
import toast ,{Toaster} from "react-hot-toast"

const Signup = ()=> {

    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const handleUsername = (e) => {
        setFormData({...formData, username: e.target.value});
    }

    const handleEmail = (e) => {
        setFormData({...formData, email: e.target.value});
    }

    const handlePassword = (e) => {
        setFormData({...formData, password: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:4000/api/v1/user/signup', formData, {
                withCredentials: true
            });
    
            if (response?.status === 200) {
                const data = response.data;
                toast.success(data.message);
            } else {
                toast.error("Signup failed. Please try again.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error("Error details:", error);
        }
    };
    

return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Signup</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

        <div>
            <label className="block text-gray-600 font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleUsername}
              placeholder="Enter Username"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

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
)
}

export default Signup;