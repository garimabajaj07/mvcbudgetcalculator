import { Router } from "express"
import upload from "../middleware/multer.js"
import { addProduct, showProducts, singleProductDetail } from "../controller/productController.js"

const productRouter = Router()

productRouter.post("/addproduct", upload.array("images", 5), addProduct)
productRouter.get("/showproducts", showProducts)
productRouter.get("/singleproduct/:id", singleProductDetail )

export default productRouter