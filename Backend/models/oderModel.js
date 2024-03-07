import mongoose from "mongoose";

const oderShema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    oderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
        }
    ],
    shippingAdress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postlcode: { type: String, required: true },
        country: { type: String, required: true },

    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        updateTime: { type: String },
        email_adress: { type: String }
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shipingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDeliverd: { type: Boolean, require: true, default: false },
    deliverdAt: { type: Date },
},
    {
        timestamps: true
    });

const Order = mongoose.model('Order', oderShema);
export default Order;