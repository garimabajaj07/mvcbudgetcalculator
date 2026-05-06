import React, { useEffect } from "react"
import { useCart } from "./CartContext"

export default function Cart() {
  useEffect(() => {
    document.title = "Your Cart"
  }, [])

  const { cart, removeFromCart } = useCart()

  let total = 0

  cart.forEach(item => {
    if (!item.productId || !item.variantId) return

    const variant = item.productId.variants.find(
      v => v._id.toString() === item.variantId.toString()
    )

    if (variant) {
      total += variant.price * item.quantity
    }
  })

  return (
    <div className="container">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart feels lonely 🛒</h3>
          <p>Add some amazing products to get started</p>
        </div>
      ) : (
        <div className="cart-layout">

          {/* LEFT: ITEMS */}
          <div className="cart-items">

            {cart.map(item => {

              if (!item.productId || !item.variantId) return null

              const variant = item.productId.variants.find(
                v => v._id.toString() === item.variantId?.toString()
              )

              if (!variant) return null

              return (
                <div className="cart-card" key={item._id}>

                  {/* IMAGE */}
                  <img
                    src={variant.images?.[0]}
                    alt={item.productId.name}
                    className="cart-img"
                  />

                  {/* DETAILS */}
                  <div className="cart-info">
                    <h3>{item.productId.name}</h3>

                    <p className="cart-variant">
                      {variant.color} • {variant.size}
                    </p>

                    <p className="cart-price">₹ {variant.price}</p>

                    <p className="cart-qty">
                      Qty: <strong>{item.quantity}</strong>
                    </p>
                  </div>

                  {/* REMOVE */}
                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.productId._id, item.variantId)
                    }
                  >
                    Remove
                  </button>
                </div>
              )
            })}

          </div>

          {/* RIGHT: SUMMARY */}
          <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  )
}