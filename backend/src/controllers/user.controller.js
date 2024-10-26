import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const signup = AsyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json(new ApiError(400, "All field are required!!"))
    }

    if (!username?.trim()) {
        return res.status(400).json(new ApiError(400, "Username should not be empty!!"))
    }

    if (!/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(email?.trim().toLowerCase())) {
        return res.status(400).json(new ApiError(400, "Invalid email address!!"))
    }

    if (password?.trim().length < 8 || password.trim().length > 16) {
        return res.status(400).json(new ApiError(400, "Password should be 8 to 16 characters long!!"))
    }

    const existingUser = await User.findOne({
        $or: [{ username: username?.trim() }, { email: email?.trim().toLowerCase() }]
    })

    if (existingUser) {
        return res.status(400).json(new ApiError(400, "You have already a account. Please try to Login!!"))
    }

    const user = await User.create({
        username: username?.trim(),
        email: email?.trim().toLowerCase(),
        password: password?.trim()
    })

    const isUserCreated = await User.findById(user._id).select("-password -refreshToken")

    if (!isUserCreated) {
        return res.status(500).json(new ApiError(500, "Something went wrong while creating account!!"))
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, isUserCreated, "User Created Successfully!!"
            )
        )
})

const login = AsyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json(new ApiError(400, "All field are required"));
    }

    if (!/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(email?.trim().toLowerCase())) {
        return res.status(400).json(new ApiError(400, "Please Enter a Valid Email"));
    }

    if (password?.trim().length < 8 || password.trim().length > 16) {
        return res.status(400).json(new ApiError(400, "Password should be 8 ato 16 characters long!!"))
    }

    const existedUser = await User.findOne({ email: email?.trim().toLowerCase() })

    if (!existedUser) {
        return res.status(400).json(new ApiError(400, "Please regsiter yourself first!!"))
    }

    const isCorrectPassword = await existedUser.comparePassword(password)

    if (!isCorrectPassword) {
        return res.status(400).json(new ApiError(400, "Invalid Password"))
    }

    //generating token for authentication
    const accessToken = existedUser.generateAccessToken()
    const refreshToken = existedUser.generateRefreshToken()


    existedUser.refreshToken = refreshToken
    await existedUser.save({ validateBeforeSave: false })

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("access_token", accessToken, options)
        .cookie("refresh_token", refreshToken, options)
        .json(
            new ApiResponse(200, {}, "Login sucessfully!!")
        )

})

const currentUser = AsyncHandler(async (req, res) => {
    const userData = await User.findById(req.user._id).select("-password -refreshToken");

    if (!userData) {
        return res.status(400).json(new ApiError(400, "Unauthorized Access!!"));
    }

    return res.status(200).json(new ApiResponse(200, {}, "Authenticated User!!", userData));
});


const logout = AsyncHandler(async (req, res) => {
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: null
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("access_token", options)
        .clearCookie("refresh_token", options)
        .json(
            new ApiResponse(
                200,
                "Logged out successfully"
            )
        )
})

export {
    signup,
    login,
    currentUser,
    logout
}
