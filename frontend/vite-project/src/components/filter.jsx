import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ apiURL, filterData }) => {
    const [selectedCategory, setSelectedCategory] = useState(filterData[0].title); // Default category
    const [blogs, setBlogs] = useState([]);

    // Function to fetch blogs based on selected category
    const fetchBlogs = async (category) => {
        try {
            const response = await axios.get(apiURL, {
                params: {
                    category: category === "All" ? "" : category,
                }, withCredentials: true
            });
            console.log("API Response:", response.data);
            setBlogs(response.data.data); // Assuming API response has a 'blogs' array
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    // Fetch blogs when selected category changes
    useEffect(() => {
        fetchBlogs(selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Category Bar */}
            <div className="flex overflow-x-auto gap-4 mb-8">
                {filterData.map((item) => (
                    <button
                        key={item.id}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${item.title === selectedCategory
                                ? "bg-slate-800 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        onClick={() => setSelectedCategory(item.title)}
                    >
                        {item.title}
                    </button>
                ))}
            </div>

            {/* Blog List */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-gray-800">{blog.title}</h2>
                            <p className="text-gray-600 mt-2 line-clamp-3">{blog.description}</p>
                            <a href={blog.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 inline-block hover:underline">
                                Read more
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No blogs found for this category.</p>
                )}
            </div>
        </div>
    );
};

export default Filter;
