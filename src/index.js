import { app } from "./app.js";
import connectDB from "./db/dbConfig.js"; 
import dotenv from "dotenv";

dotenv.config();

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port : ${process.env.PORT}`);
        
    })

    app.on("error", (err)=>{
        console.log("Express server error", err);
    })
})
.catch((error)=>{
    console.log("MONGODB Connection Failed !!!", error);
})