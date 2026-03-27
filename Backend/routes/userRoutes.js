import { Router } from "express";
import { submit, fetchRecords, login, deleteUser, editUser,logout } from "../controller/userControl.js";
import { checkToken } from "../middleware/checkToken.js";

const UserRouting= Router()

UserRouting.post("/submit", submit)
UserRouting.get("/records", checkToken,fetchRecords)
UserRouting.post("/login", login)
UserRouting.get("/check", checkToken, (req, res) => {
    res.status(200).json({ message: "User Authenticated" })
})
UserRouting.delete("/deleteuser/:id",checkToken, deleteUser)
UserRouting.put("/edituser/:id",checkToken, editUser)
UserRouting.get("/logout", logout)
export default UserRouting