import jwt from "jsonwebtoken"
import SellerModel from "../model/sellerSchema.js"

export async function checkSeller(req, res, next) {
  try {
    const token = req.cookies.sellertoken

    if (!token) {
      return res.status(401).json({ message: "Token not found" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // fetch fresh seller from DB
    const seller = await SellerModel.findById(decoded.id)

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" })
    }

    // block check
    if (seller.status === "blocked") {
      return res.status(403).json({ message: "Seller blocked by admin" })
    }

    // attach full seller
    req.user = seller

    next()

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}