import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}))
app.use(express.json({ limit: "20kb"}))
app.use(express.urlencoded({ limit: "20kb", extended: true }))
app.use(express.static("public"));
app.use(cookieParser());


// import Routes

import userRoutes from "./routes/user.routes";
import memberShipType from "./routes/memberShipType.routes";
import groupRoutes from "./routes/group.routes";
import memberManagementRoutes from "./routes/memberManagement.routes";

app.use("/api/users", userRoutes);
app.use("/api/memberShipTypes", memberShipType);
app.use("/api/group", groupRoutes);
app.use("/api/memberManagement", memberManagementRoutes);


export { app };