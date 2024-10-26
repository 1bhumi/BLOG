import React, { useState } from "react"; // Import useState for managing username
import "../App.css";
import { FaRegUser } from "react-icons/fa"; // Import the FaRegUser icon
import axios from 'axios'; // Import axios for making API requests
import { useNavigate } from "react-router-dom"; // Import navigate function for navigation

const Navbar = () => {
    const [credentials, setCredentials] = useState({
         email: '',
         password: '' 
        }); // State for credentials

        const [firstChar, setFirstChar] = useState(''); // State for first character of email
        const navigate = useNavigate(); // Use navigate hook for navigation

        const performLoginOperation = async (e) => {
            e.preventDefault(); // Prevent form submission
            e.stopPropagation(); // Stop form from reloading the page

            try {
                const url = "http://localhost:4000/api/v1/user/current-user"; // Replace with your API endpoint
                const response = await axios.post(url, credentials, {withCredentials: true}); 

                navigate('/blog'); // Navigate to the blog page after successful login
            } catch (error) {
                navigate('/login'); // Navigate to the login page if login fails
            }

            

        }
    return (
        <div>
            <nav className="bg-purple-600 py-3 px-6 shadow-lg flex justify-between items-center"> {/* Flex container for navbar */}
                <h1 className="flex-1 text-center font-bold font-serif text-white text-4xl tracking-wider">
                    BLOG
                </h1>

                <div className="flex items-center"> {/* Align items in the profile section */}
                    <FaRegUser className="h-8 w-8 text-white" /> {/* Profile icon */}
                    {
                        firstChar && (<span className="text-white text-lg ml-2">{firstChar}</span>)
                    }
                </div>
                
            </nav>
        </div>
    );
};

export default Navbar;
