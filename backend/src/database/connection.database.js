import mongoose from "mongoose";
import dbName from "../../constant.js";

const dbConnect = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
        console.log(`Connected to MongoDB: ${response.connection.host}`);
    } catch (error) {
        console.errot(error)
        process.exit(1);
    }
}

export default dbConnect;

