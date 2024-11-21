import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: [true, 'username is required'],
            trim: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function(v){
                    return /^[a-zA-Z0-9_]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid username!`,
            }
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            validate: {
                validator: function(v){
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email!`,
            }
        },
        password:{
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],
        },
        phone:{
            type: String,
            required: [true, 'Phone number is required'],
            unique: true,
            validate: {
                validator: function(v){
                    return /^[0-9]{10,11}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            }
        },
        address:{
            type: String,
            required: [true, 'Address is required'],

        },
        refreshToken:{
            type: String,
            default: null,
        }
    },
    {timestamps: true}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema);