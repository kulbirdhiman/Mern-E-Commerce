import mongoose from "mongoose";

const Userschema = mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }
}, { timestamps: true })



const User = mongoose.model("User", Userschema);
export default User