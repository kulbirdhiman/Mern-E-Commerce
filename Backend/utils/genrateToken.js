import jwt from "jsonwebtoken";

const genrateToken = (res, userId) => {
    const token = jwt.sign(userId, 'karan', {
        expiresIn: "30d"
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: "devploment",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return token
}
export default genrateToken