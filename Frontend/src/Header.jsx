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

      navigate("/user/login")

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="header">
      <h2>MyShop</h2>

      <div>
        <Link to="/user/register">Register</Link>
        <Link to="/">Products</Link>
        <Link to="/user/cart">
          Cart ({count})
        </Link>
        <Link to="/user/login">Login</Link>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}