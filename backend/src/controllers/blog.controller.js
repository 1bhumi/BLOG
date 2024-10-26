import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Blog from "../models/blog.model.js";

const createBlog = AsyncHandler(async (req, res) => {
    const { title, description, link, category } = req.body;

    if (!title || !description || !link || !category) {
        return res.status(400).json(new ApiError(400, null, "Please provide all required fields"));
    }

    if (!title?.trim()) {
        return res.status(400).json(new ApiError(400, null, "Title cannot be empty"));
    }

    if (!description?.trim()) {
        return res.status(400).json(new ApiError(400, null, "Description cannot be empty"));
    }

    if (!link?.trim()) {
        return res.status(400).json(new ApiError(400, null, "Link cannot be empty"));
    }

    const validateCategory = ["Technology", "Sports", "Business", "Entertainment"]; 
    if (!validateCategory.includes(category)) {
        return res.status(400).json(new ApiError(400, null, "Invalid category"));
    }


    const existedblog = await Blog.findOne({ title: title.trim() });

    if (existedblog) {
        return res.status(400).json(new ApiError(400, null, "Blog already exists"));
    }

    const newBlog = await Blog.create({
        title: title?.trim(),
        description: description?.trim(),
        link: link?.trim(),
        category: category?.trim()
    })

    if (!newBlog) {
        return res.status(500).json(new ApiError(500, null, "Failed to create blog"));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Blog created successfully")
        )
})

const getBlog = AsyncHandler(async (req, res) => {
    const { category } = req.query; // Get the category from the request query

    // Build the filter object based on the category
    const filter = category && category !== "All" ? { category } : {}; // Use empty object for "All"

    try {
        const blogData = await Blog.find(filter); // Apply the filter to find only matching blogs

        if (!blogData || blogData.length === 0) {
            return res.status(400).json(new ApiError(400, "No Blog found!!"));
        }

        return res.status(200).json(new ApiResponse(200, blogData, "Blog Data!!"));
    } catch (error) {
        console.error("Error fetching blogs:", error); // Log any errors for debugging
        return res.status(500).json(new ApiError(500, "Internal Server Error")); // Send a generic error response
    }
});


export {
    createBlog,
    getBlog
}