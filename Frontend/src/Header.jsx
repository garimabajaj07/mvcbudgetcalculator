import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "./CartContext"

export default function Header() {

  const { cart } = useCart()

  // calculate total quantity
  let count = 0
  cart.forEach(item => {
    count += item.quantity
  })

  return (
    <div className="header">
      <h2>MyShop</h2>

      <div>
        <Link to="/showproducts">Products</Link>
        <Link to="/cart">
          Cart ({count})
        </Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  )
}