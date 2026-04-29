import { Router } from "express"
import upload from "../middleware/multer.js"
import { addProduct, deleteProduct, editProduct, showProducts, singleProductDetail } from "../controller/productController.js"

const productRouter = Router()

productRouter.post("/addproduct", upload.any(), addProduct)
productRouter.get("/showproducts", showProducts)
productRouter.get("/singleproduct/:id", singleProductDetail)
productRouter.delete("/deleteproduct/:id", deleteProduct)
productRouter.put( "/editproduct/:id", upload.any(), editProduct)
export default productRouter