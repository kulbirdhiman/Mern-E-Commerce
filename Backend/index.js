import express from "express";
import connectDb from "./config/connectDb.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
// Routes 
import userRouter from './routes/UserRoutes.js';
import catagoryRoutes from './routes/catagoryRoutes.js';
import productRoutes from './routes/productsRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
dotenv.config()
connectDb()
const port = 5000

app.use("/api/user", userRouter)
app.use("/api/category", catagoryRoutes)
app.use("/api/product", productRoutes)
app.use("/api/upload", uploadRoutes)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log("server up"))