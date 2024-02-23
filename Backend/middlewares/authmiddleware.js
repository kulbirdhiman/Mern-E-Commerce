import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";

const authmiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;

    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, "karan");
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed.");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token.");
    }
});

const authrizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        console.log(req.user);
        next();
    } else {
        res.status(401).send("Not authorized as an admin.");
    }
};

export { authmiddleware, authrizeAdmin };
