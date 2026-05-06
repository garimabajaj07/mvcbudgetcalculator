import { Router } from "express";
import { adminLogin, deleteMultipleProducts, deleteSeller, deleteUser, editSeller, editUser, fetchSellerRecords, fetchUserRecords, toggleSellerBlock, toggleUserBlock } from "../controller/admincontroller.js";
import { checkAdmin } from "../middleware/checkadmin.js"

const adminRoutes = Router()

adminRoutes.post("/login", adminLogin)
adminRoutes.get("/checkadmin", checkAdmin, (req, res) => {
    res.status(200).json({ message: "Admin Authenticated" })
})
adminRoutes.post("/delete-multiple", checkAdmin, deleteMultipleProducts)
adminRoutes.get("/user/records", checkAdmin, fetchUserRecords)
adminRoutes.delete("user/delete/:id", checkAdmin, deleteUser)
adminRoutes.put("user/edit/:id", checkAdmin, editUser)
adminRoutes.get("/seller/records", checkAdmin, fetchSellerRecords)
adminRoutes.delete("seller/delete/:id", checkAdmin, deleteSeller)
adminRoutes.put("seller/edit/:id", checkAdmin, editSeller)
// user
adminRoutes.put("/block-user/:id", checkAdmin, toggleUserBlock)
// seller
adminRoutes.put("/block-seller/:id", checkAdmin, toggleSellerBlock)

export default adminRoutes