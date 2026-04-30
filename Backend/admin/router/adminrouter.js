import { Router } from "express";
import { adminLogin, deleteMultipleProducts, deleteUser, editUser, fetchRecords } from "../controller/admincontroller.js";
import { checkAdmin } from "../middleware/checkadmin.js"

const adminRoutes = Router()

adminRoutes.post("/login", adminLogin)
adminRoutes.get("/checkadmin", checkAdmin, (req, res) => {
    res.status(200).json({ message: "Admin Authenticated" })
})
adminRoutes.post("/delete-multiple",checkAdmin, deleteMultipleProducts)
adminRoutes.get("/user/records", checkAdmin,fetchRecords)
adminRoutes.delete("user/delete/:id",checkAdmin, deleteUser)
adminRoutes.put("user/edit/:id",checkAdmin, editUser)

export default adminRoutes