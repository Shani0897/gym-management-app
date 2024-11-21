import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password,phone, address } = req.body;

    if ([username, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(400, "User with this email or username already exists")
    }

    const user = await User.create({
        username,
        email,
        password,
        phone,
        address
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "Error creating user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )
})


export { registerUser };