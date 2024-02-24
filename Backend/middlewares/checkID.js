import { ObjectId } from "mongoose";
const CheckId = (req, res, next) => {
    if (!ObjectId(req.parms.id)) {
        res.status(404)
        throw new Error
    }
    next()
}
export default CheckId