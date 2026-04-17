import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      },
      variantId: {
        type: mongoose.Schema.Types.ObjectId
      },

      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
})

export default mongoose.model("cart", cartSchema)