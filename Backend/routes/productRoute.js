import { Router } from "express"
import upload from "../middleware/multer.js"
import { addProduct, deleteProduct, showProducts, singleProductDetail } from "../controller/productController.js"
import { checkToken } from "../middleware/checkToken.js"

const productRouter = Router()

productRouter.post("/addproduct", upload.array("images", 5), addProduct)
productRouter.get("/showproducts", showProducts)
productRouter.get("/singleproduct/:id", checkToken, singleProductDetail )
productRouter.delete("/deleteproduct/:id", checkToken,deleteProduct)

export default productRouter