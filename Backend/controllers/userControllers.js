import expressAsyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
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
        res.send(201).json({
            id: user._id,
            name: user._userName,
            password: user.password,
            email: user.email
        })
    } catch (err) {
        console.log(err)
    }
})
export { createUser };