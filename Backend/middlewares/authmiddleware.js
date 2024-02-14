import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const authmiddleware = expressAsyncHandler(async (req, res, next) => {
    let token = req.cookies.Jwt;
    if (token) {
        try {
            const decoded = Jwt.verify(token, "karan")
            req.User = User.findOne({ _id: decoded._id }).select("-password");
            next();

        } catch (error) {
            throw new Error("invalid token ")
        }
    }
    else {
        throw new Error("invalid token ")
    }
})

const authrizeAdmin = (req, res) => {
    if (req.User && req.User.isAdmin) {
        next()
    }
    else {
        res.status(401).send("your are not admin")
    }
}
export { authrizeAdmin, authmiddleware }