import expressAsyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import genrateToken from '../utils/genrateToken.js'
const createUser = expressAsyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400).json({ "error": "Please provide all the required fields" })
    }
    const isExits = await User.findOne({ email: email });
    if (isExits) { res.send("user already exits"); } else {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        try {
            const Newuser = await User.create({ userName, email, password: hashPassword });
            genrateToken(res, Newuser._id)
            res.status(201).json({
                id: Newuser._id,
                userName: Newuser.userName,
                email: Newuser.email,
                isAdmin: Newuser.isAdmin
            })
        } catch (err) {
            console.log(err)
        }
    }

})
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const isExits = await User.findOne({ email })
    if (isExits) {
        const isPassword = await bcrypt.compare(password, isExits.password)
        if (isPassword) {
            genrateToken(res, isExits._id)
            res.status(201).json({
                message: "Logged in successfully",
                userName: isExits.userName,
                email: isExits.email,
                isAdmin: isExits.isAdmin
            })
        }
        else {
            console.log("something wrog")
        }

    }
})
const logout = expressAsyncHandler(async (req, res) => {
    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.send('successfully logout')
})

const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getCurrnetUSerProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            id: user._id,
            userName: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error("user not found")
    }
})
const updateCurrentUSer = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // Make sure to use await to wait for the result
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashPassword;
        }

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id, // Use updatedUser instead of user
            userName: updatedUser.name, // Use updatedUser instead of user
            email: updatedUser.email, // Use updatedUser instead of user
        });
    } else {
        res.status(404).json({ error: "User not found" }); // Send a JSON response
    }

})
const deleteUSer = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (req.user.isAdmin && user.isAdmin) {
            res.status(404).send("can not delete admin")
        }
        const deleteUser = await User.deleteOne({ _id: user._id })
        res.send("Deleted User")
    }
    else {
        res.status(404)
        throw new Error("user not founded")
    }

})
const getUSerById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password")
    if (user) {
        res.json(user)
    }
    else {
        res.status(404)
        throw new Error("user Not founded")
    }

})
const UpdateUserById = expressAsyncHandler(async (req, res) => {
    const { name, email } = req.body
    const user = await User.findById(req.params.id)
    if (user) {
        console.log(user)
        // user.userName = req.body.name
        user.email = req.body.email
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { userName: name, email: email })
        res.json(updatedUser)
        // res.json({
        //     id: updatedUser._id,
        //     userName: updatedUser.name,
        //     email: updatedUser.email,
        //     isAdmin: updatedUser.isAdmin
        // })
    }
    else {
        res.status(404)
        throw new Error("Can't find user")
    }
})
export { createUser, loginUser, logout, getAllUsers, getCurrnetUSerProfile, updateCurrentUSer, deleteUSer, getUSerById, UpdateUserById };