import { Router } from "express"
import upload from "../middleware/multer.js"
import { addProduct, deleteProduct, showProducts, singleProductDetail } from "../controller/productController.js"

const productRouter = Router()

productRouter.post("/addproduct", upload.any(), addProduct)
productRouter.get("/showproducts", showProducts)
productRouter.get("/singleproduct/:id",  singleProductDetail )
productRouter.delete("/deleteproduct/:id", deleteProduct)

export default productRouter