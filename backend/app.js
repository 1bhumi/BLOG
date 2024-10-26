import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({path: './.env'});

const app = express();

app.use(cors({origin: "http://localhost:5173", credentials: true}))

app.use(express.json({limit: "20kb"}));

app.use(express.urlencoded({limit: "30kb", extended: true}))

app.use(express.static("public"))

app.use(cookieParser())


import userRouter from "./src/routes/user.route.js";
import blogRouter from "./src/routes/blog.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

export default app;