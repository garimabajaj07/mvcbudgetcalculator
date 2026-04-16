import { Router } from "express";
import { submit, login,logout } from "../controller/userControl.js";
import { checkToken } from "../middleware/checkToken.js";
import { forgotPassword, resetPassword } from "../controller/forgotPassword.js";

const UserRouting= Router()

UserRouting.post("/submit", submit)
UserRouting.post("/login", login)
UserRouting.get("/checklogin", checkToken, (req, res) => {
    res.status(200).json({ message: "User Authenticated" })
})
UserRouting.get("/logout", logout)
UserRouting.post("/forgot-password", forgotPassword)
UserRouting.put("/reset-password/:token", resetPassword)
export default UserRouting