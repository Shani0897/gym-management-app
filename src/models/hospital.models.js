import mongoose from "mongoose";



const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    addressline1: {
        type: String,
    },
    speciality:[
        {
            type: String,
        }
    ],
    pincode: {
        type: String,
    }
}, {timestamps:true});



export const Hospital = mongoose.model("Hospital",hospitalSchema);