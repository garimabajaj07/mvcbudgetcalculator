import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  variants: [
    {
      color: { type: String },
      size: { type: String },
      price: { type: Number, required: true },
      images: [{ type: String }],
      stock: { type: Number, default: 0 }

    }
  ]
})

const Product = mongoose.model("product", productSchema)

export default Product