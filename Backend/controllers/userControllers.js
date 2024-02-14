import expressAsyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import genrateToken from "../utils/genrateToken.js"
const createUser = expressAsyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400).json({ "error": "Please provide all the required fields" })
    }
    const isExits = await User.findOne({ email: email });
    if (isExits) { res.send("user already exits"); }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const user = User.create({ userName, email, password: hashPassword });
        genrateToken(res, user._id)
        res.send(201).json({
            id: user._id,
            name: user._userName,
            password: user.password,
            email: user.email,

        })
    } catch (err) {
        console.log(err)
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
                userName: isExits.name,
                email: isExits.email,
                isAdmin: isExits.isAdmin
            })
        }

    }
})
const logout = expressAsyncHandler(async (req, res) => {
    res.cookie("jwt", '', {
        httpOnly: true,
        expires: new Date.now(0)
    })

    res.send('successfully logout')
})

const GetAllUser = expressAsyncHandler(async (req, res) => {
    const getAllUser = User.find({})
    res.send(getAllAdmin)
})

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
    const user = User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashPassword;

        }

        const updatedUser = await user.save()
        res.status(200).json({
            _id: user._id,
            userName: user.name,
            email: user.email,
        })
    }
    else {
        res.status(404)
        throw new Error("User not")
    }
})
const deleteUSer = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        if (req.user.isAdmin && user.isAdmin) {
            res.status(404).send("can not delete admin")
        }
        const deleteUser = User.deleteOne({ _id: user._id })
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
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        const updatedUser = await user.save()
        res.json({
            id: updatedUser._id,
            userName: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }
    else {
        res.status(404)
        throw new Error("Can't find user")
    }
})
export { createUser, loginUser, logout, GetAllUser, getCurrnetUSerProfile, updateCurrentUSer, deleteUSer, getUSerById, UpdateUserById };