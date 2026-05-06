import React from "react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <div className="footer">
      <h3>MyShop</h3>
      <p>Your one-stop destination for quality products at the best prices.</p>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user/login">User</Link></li>
        <li><Link to="/seller/login">Seller</Link></li>
        <li><Link to="/admin/login">Admin</Link></li>
      </ul>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
      </div>
    </div>
  )
}