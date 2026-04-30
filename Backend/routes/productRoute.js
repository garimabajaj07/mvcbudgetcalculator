import { Router } from "express"
import upload from "../middleware/multer.js"
import { addProduct, deleteProduct, editProduct, showProducts, singleProductDetail } from "../controller/productController.js"

const productRouter = Router()

productRouter.post("/add", upload.any(), addProduct)
productRouter.get("/show", showProducts)
productRouter.get("/single/:id", singleProductDetail)
productRouter.delete("/delete/:id", deleteProduct)
productRouter.put( "/edit/:id", upload.any(), editProduct)
export default productRouter