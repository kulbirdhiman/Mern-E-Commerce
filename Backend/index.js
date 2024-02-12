import express from "express";
import connectDb from "./config/connectDb.js";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
dotenv.config()
const url = "mongodb://localhost:27017/ecomerce"
connectDb()
app.get("/", (req, res) => {
    res.send("hello Karan")
})
const port = 5000

app.listen(port, () => console.log("server up"))