import { Router } from "express";
import { deleteProducts, loginSeller, myProducts, sellerAddProduct, submitSeller } from "../controller/sellerController.js";
import { checkSeller } from "../middleware/sellerToken.js";
import upload from "../../middleware/multer.js";

const SellerRouting = Router()
SellerRouting.post("/register", submitSeller)
SellerRouting.post("/login", loginSeller)
SellerRouting.get("/checkseller", checkSeller, (req, res) => {
    res.status(200).json({ message: "Seller Authenticated" })
})
SellerRouting.post("/addproduct", checkSeller, upload.any(), sellerAddProduct)
SellerRouting.get("/myproducts", checkSeller, myProducts)
SellerRouting.delete("/delete-multiple", checkSeller, deleteProducts)

export default SellerRouting