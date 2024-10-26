import mongoose, {Schema} from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [ "Technology", "Sports", "Business", "Entertainment"]
    }
}, {timestamps: true})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog;