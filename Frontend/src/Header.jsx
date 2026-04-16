import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "./CartContext"
import api from "../axios"

export default function Header() {

  const { cart, clearCart } = useCart()
  const navigate=useNavigate()

  // calculate total quantity
  let count = 0
  cart.forEach(item => {
    count += item.quantity
  })
  async function handleLogout() {
    try {
      await api.get("/user/logout", {
        withCredentials: true
      })

      clearCart()

      navigate("/login")

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="header">
      <h2>MyShop</h2>

      <div>
        <Link to="/showproducts">Products</Link>
        <Link to="/cart">
          Cart ({count})
        </Link>
        <Link to="/login">Login</Link>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}