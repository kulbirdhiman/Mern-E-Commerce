import mongoose from "mongoose";

const catagoryShecma = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true
    }
})


const catagory = mongoose.model("Category", catagoryShecma)
export default catagory