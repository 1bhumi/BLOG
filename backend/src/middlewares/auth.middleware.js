import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const authentication = async (req,res, next) => {
    try {
        const token = req.cookies?.access_token

    
        if(!token){
            return res.status(401).json(new ApiError(401, "Login session is expired!!"))
        }
    
        //we will decode access token with access token secret key which we have store in env variable
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        //finding admin by id and store info of admin in "admin variable"
        const user = await User.findById(decodeToken._id).select("-password -refreshToken")
    
        //store admin data in property of req. object
        req.user = user

        next()
    } catch (error) {
        return res .status(400).json(new ApiError( 400, `Auth.miidleware.js :: authentication :: error: ${error.message}`))        
    }
}

export default authentication;