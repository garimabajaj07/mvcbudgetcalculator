import { Router } from "express"
import { addToCart, getCart, decreaseQuantity,  removeFromCart } from "../controller/cartController.js"
import { checkToken } from "../middleware/checkToken.js"

const cartRoutes = Router()

cartRoutes.post("/add", checkToken, addToCart)
cartRoutes.get("/", checkToken, getCart)
cartRoutes.post("/decrease", checkToken, decreaseQuantity)
cartRoutes.delete("/remove/:productId/:variantId", checkToken, removeFromCart)

export default cartRoutes