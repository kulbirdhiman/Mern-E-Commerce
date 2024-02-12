import mongoose from 'mongoose'
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce")
        console.log(`connected db ✔`)
    } catch (err) {
        console.log(`not connected`)
    }
}
export default connectDb