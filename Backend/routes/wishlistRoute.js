import express, { Router } from "express"
import { addWishlist, removeWishlist, showWishlist } from "../controller/wishlListControl.js"
import { checkToken } from "../middleware/checkToken.js"

const wishlistrouter = Router()

wishlistrouter.post("/add",checkToken, addWishlist)
wishlistrouter.delete("/remove/:productId",checkToken, removeWishlist)
wishlistrouter.get("/show", checkToken, showWishlist)

export default wishlistrouter