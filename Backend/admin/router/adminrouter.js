import { Router } from "express";
import { adminLogin, deleteMultipleProducts, deleteUser, editUser, fetchRecords } from "../controller/admincontroller.js";
import { checkAdmin } from "../middleware/checkadmin.js"

const adminRoutes = Router()

adminRoutes.post("/adminlogin", adminLogin)
adminRoutes.get("/checkadmin", checkAdmin, (req, res) => {
    res.status(200).json({ message: "Admin Authenticated" })
})
adminRoutes.post("/delete-multiple",checkAdmin, deleteMultipleProducts)
adminRoutes.get("/records", checkAdmin,fetchRecords)
adminRoutes.delete("/deleteuser/:id",checkAdmin, deleteUser)
adminRoutes.put("/edituser/:id",checkAdmin, editUser)

export default adminRoutes