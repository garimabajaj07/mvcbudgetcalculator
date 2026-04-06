import jwt from "jsonwebtoken"

export async function checkToken(req, res, next) {
    try {
        const token = req.cookies.token
            
        if (!token) return res.status(401).json({ message: "Token not found" })
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken  //{id, username}
        next()
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
