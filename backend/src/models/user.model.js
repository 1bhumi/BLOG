import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 16
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true })

//hashing password
userSchema.pre("save", async function(next){
    try {
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password, 10)
        }
        next()
    } catch (error) {
        console.log(error)
        
    }
})

userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


const User = mongoose.model("User", userSchema);

export default User;