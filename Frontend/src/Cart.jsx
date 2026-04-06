import React from "react"
import { useCart } from "./CartContext"

export default function Cart() {
  const { cart, removeFromCart } = useCart()

  let total = 0
  cart.forEach(item => {
    total += item.productId.price * item.quantity
  })

  return (
    <div className="container">
      <h2>Cart</h2>

      {cart.length === 0 && <p className="empty">Cart is empty</p>}

      {cart.map(item => (
        <div className="cart-item" key={item._id}>
          <div>
            <h3>{item.productId.name}</h3>
            <p>₹ {item.productId.price}</p>
            <p>Qty: {item.quantity}</p>
          </div>

          <p onClick={() => removeFromCart(item.productId._id)} style={{cursor:"pointer"}}>
            ❌
          </p>
        </div>
      ))}

      <div className="cart-total">
        Total: ₹ {total}
      </div>
    </div>
  )
}