import jwt from "jsonwebtoken"
import UserModel from "../model/schema.js"

export async function checkToken(req, res, next) {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Token not found" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //  fetch fresh user from DB
    const user = await UserModel.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    //  block check
    if (user.status === "blocked") {
      return res.status(403).json({ message: "Account blocked by admin" })
    }

    // attach full user (not just token data)
    req.user = user

    next()

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}