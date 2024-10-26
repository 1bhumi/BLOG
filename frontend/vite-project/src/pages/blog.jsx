import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import CreateBlog from "../components/createBlog";
import Filter from "../components/filter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Blog = () => {
    const navigate = useNavigate();
    const filterData = [
        { id: 1, title: "All" },
        { id: 2, title: "Technology" },
        { id: 3, title: "Sports" },
        { id: 4, title: "Business" },
        { id: 5, title: "Entertainment" },
    ];

    const apiURL = "http://localhost:4000/api/v1/blog/get-blog";

    // open and close form 
    const [isModelOpen, setIsModelOpen] = useState(false);

    const handleModelOpen = () => {
        setIsModelOpen(true);
    };

    const handleModelClose = () => {
        setIsModelOpen(false);
    };

    //check authentication before accessing the blog page  
    const checkAuthentication = async () => {
        try {
            // Replace with your actual API call
            const response = await axios.get('http://localhost:4000/api/v1/user/current-user', { withCredentials: true });
                        
        } catch (error) {
            console.log("Error details:", error);  // Log error details for debugging
            setTimeout( ()=> {
                navigate('/login');
            }, 500)
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex justify-end p-4"> {/* Flex container to align the button to the right */}
                <button 
                    onClick={handleModelOpen} 
                    className="bg-slate-800 text-gray-50 py-2 px-4 rounded"
                >
                    Create Blog
                </button>
            </div>
            {isModelOpen && <CreateBlog onClose={handleModelClose}  />}

            <Filter apiURL={apiURL} filterData={filterData} />
        </div>
    );
};

export default Blog;
