import jwt from "jsonwebtoken"

export async function checkToken(req, res, next) {
    try {
        const token = req.cookies.token
        console.log(token);

        if (!token) return res.status(400).json({ message: "Token not found" })
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken
        next()
        console.log("cookies:", req.cookies)
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
