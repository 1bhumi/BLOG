import '../App.css';
import { useState } from 'react';
import React from "react";
import axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast';

const CreateBlog = ({ onClose, onAddBlog }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        link: "",
        category: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle submission logic here (e.g., API call)
        
        try {
            const response = await axios.post('http://localhost:4000/api/v1/blog/create', formData, { withCredentials: true });

            if(response?.status === 200){
                const data = response?.data
                onAddBlog(response.data.data);
                toast.success(data.message);
                setIsSubmitted(true); // Set isSubmitted flag to true to prevent re-submission
            }else {
                toast.error("Signup failed. Please try again.");
            }
        } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.error("Error details:", error);
    }
    };

    // Call onClose() when the modal should close
    if (isSubmitted) {
        onClose();
        setIsSubmitted(false); // Reset the state to prevent immediate closing
    }

    return (
       
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <Toaster /> 
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-6 text-gray-800">Create Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                        <input 
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link:</label>
                        <input 
                            type="text"
                            name="link"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
                        <select 
                            value={formData.category}
                            name="category"
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-500 transition"
                            required
                        >
                            <option value="">Select a Category</option>
                            <option> Technology</option>
                            <option>Sports</option>
                            <option>Business</option>
                            <option >Entertainment</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="mr-2 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateBlog;
