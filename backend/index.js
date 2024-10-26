import dbConnect from "./src/database/connection.database.js";
import app from "./app.js"
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

dbConnect()
.then(()=> {
    console.log("Database Connected");

    app.on("error", (error)=> {
        console.log(error);
    })

    app.listen(process.env.PORT, ()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
})

.catch((error)=> {
    console.log(error);
})