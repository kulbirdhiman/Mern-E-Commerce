import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema
const reviewShecma = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.type.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })

const ProfuctShecma = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: String, required: true },
    catagory: { ObjectId, required: true, ref: "catagory" },
    price: { type: Number, required: true },
    descption: { type: string, required: true },
    reviews: [reviewShecma],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, require: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }
}, { timestamps: true })
const Product = mongoose.model("Product", ProfuctShecma);
export default Product
