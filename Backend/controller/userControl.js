import UserModel from "../model/schema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

export async function submit(req, res) {
    try {
        const { name, email, phoneNo, gender, dob, username, password } = req.body
        //  Required fields
        if (!name || !email || !phoneNo || !gender || !dob || !username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (name.length < 6) {
            return res.status(400).json({ message: "Name must be at least 6 characters" })
        }

        if (username.length < 6) {
            return res.status(400).json({ message: "Username must be at least 6 characters" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" })
        }

        // check existing email
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "  Already exists" })
        }


        // hashed password
        const hashedPassword = await bcrypt.hash(password, 10)

        const form = new UserModel(
            {
                name,
                email,
                phoneNo,
                gender,
                dob,
                username,
                password: hashedPassword
            })
        await form.save()
        res.status(200).json({ message: "User registered successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })

    }

}


export async function login(req, res) {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: "Username and Password required" })
        }
        const usernameExists = await UserModel.findOne({ username })
        if (!usernameExists) {
            return res.status(401).json({ message: "User not found" })
        }
        const matchPassword = await bcrypt.compare(password, usernameExists.password)
        if (!matchPassword) {
            return res.status(401).json({ message: "Invalid password" })
        }
        //TOKEN
        const userToken = jwt.sign(
            { id: usernameExists._id, username: usernameExists.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        //SEND TOKEN TO FRONTEND
        res.cookie("token", userToken, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.SAME_SITE,
            maxAge: 60 * 60 * 1000
        })
        res.json({ message: "Login successful" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}


export async function logout(req, res) {

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: process.env.SAME_SITE, // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })
    res.clearCookie("tokenadmin", {
        httpOnly: true,
        secure: true,
        sameSite: process.env.SAME_SITE
    })
    res.clearCookie("sellertoken", {
        httpOnly: true,
        secure: true,
        sameSite: process.env.SAME_SITE
    })


    res.json({ message: "Logged out successfully" })
}
