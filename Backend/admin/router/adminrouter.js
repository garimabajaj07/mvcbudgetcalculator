import { Router } from "express";
import { adminLogin } from "../controller/admincontroller.js";
import { checkAdmin } from "../middleware/checkadmin.js"

const adminRoutes = Router()

adminRoutes.get("/adminlogin", adminLogin)
adminRoutes.get("/checkadmin", checkAdmin, (req, res) => {
    res.status(200).json({ message: "Admin Authenticated" })
})

export default adminRoutes