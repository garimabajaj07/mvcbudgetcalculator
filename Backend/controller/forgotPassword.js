import jwt from "jsonwebtoken"
import UserModel from "../model/schema.js"
import { sendEmail } from "../sendEmail.js"
import bcrypt from "bcrypt"

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body

    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // create JWT token (expires in 15 min)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    )

    const resetLink = `http://localhost:5173/reset-password/${token}`

    await sendEmail(
      email,
      "Reset Password",
      `Click here to reset password: ${resetLink}`
    )
    
    res.json({ message: "Reset link sent to email" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function resetPassword(req, res) {
  try {
    const { token } = req.params
    const { password } = req.body

    // ❗ check password exists
    if (!password) {
      return res.status(400).json({ message: "Password is required" })
    }

    //  verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // find user
    const user = await UserModel.findById(decoded.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // update password
    user.password = hashedPassword
    await user.save()

    res.status(200).json({ message: "Password updated successfully" })

  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid or expired token" })
  }
}