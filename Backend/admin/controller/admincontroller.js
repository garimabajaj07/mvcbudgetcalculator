import AdminModel from "../model/adminSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

export async function adminLogin(req, res) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password required" })
        }
        const usernameExists = await AdminModel.findOne({ username })
        if (!usernameExists) {
            return res.status(401).json({ message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(password, usernameExists.password)
        if (!matchPassword) {
            return res.status(401).json({ message: "Invalid password" })
        }
        //TOKEN
        const adminToken = jwt.sign(
            { id: usernameExists._id, username: usernameExists.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        //SEND TOKEN TO FRONTEND
        res.cookie("tokenadmin", adminToken, {
            httpOnly: true,
            secure: true,
            sameSite:  process.env.SAME_SITE,
            maxAge: 60 * 60 * 1000
        })
        res.json({ message: "Login successful" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}