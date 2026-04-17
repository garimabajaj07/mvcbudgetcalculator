import React from "react"
import { useCart } from "./CartContext"

export default function Cart() {
  const { cart, removeFromCart } = useCart()

  let total = 0

  cart.forEach(item => {
    if (!item.productId || !item.variantId) return   // ✅ prevent crash

    const variant = item.productId.variants.find(
      v => v._id.toString() === item.variantId.toString()
    )

    if (variant) {
      total += variant.price * item.quantity
    }
  })

  return (
    <div className="container">
      <h2>Cart</h2>

      {cart.length === 0 && <p className="empty">Cart is empty</p>}

      {cart.map(item => {

        if (!item.productId || !item.variantId) return null   // ✅ skip broken items

        const variant = item.productId.variants.find(
          v => v._id.toString() === item.variantId?.toString()
        )

        if (!variant) return null

        return (
          <div className="cart-item" key={item._id}>
            <div>
              <h3>{item.productId.name}</h3>

              {/* ✅ show variant details */}
              <p>Color: {variant.color}</p>
              <p>Size: {variant.size}</p>

              <p>₹ {variant.price}</p>
              <p>Qty: {item.quantity}</p>
            </div>

            <p
              onClick={() =>
                removeFromCart(item.productId._id, item.variantId)
              }
              style={{ cursor: "pointer" }}
            >
              ❌
            </p>
          </div>
        )
      })}

      <div className="cart-total">
        Total: ₹ {total}
      </div>
    </div>
  )
}