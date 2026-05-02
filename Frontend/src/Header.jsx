import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "./CartContext"
import { useAuth } from "./AuthContext"
import { useAdmin } from "./AdminContext"
import { useSeller } from "./seller pages/SellerContext"

export default function Header() {

  const navigate = useNavigate()

  const { cart, clearCart } = useCart()

  const { isLoggedIn: userLoggedIn, logoutUser } = useAuth()
  const { isLoggedIn: adminLoggedIn, logoutAdmin } = useAdmin()
  const { isLoggedIn: sellerLoggedIn, logoutSeller } = useSeller()

  // combined login state
  const isLoggedIn = userLoggedIn || adminLoggedIn || sellerLoggedIn

  // cart count
  let count = 0
  cart.forEach(item => {
    count += item.quantity
  })

  // logout handler
  async function handleLogout() {
    try {
      if (userLoggedIn) await logoutUser()
      if (adminLoggedIn) await logoutAdmin()
      if (sellerLoggedIn) await logoutSeller()

      clearCart()

      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="header">
      <h2>MyShop</h2>

      <div>

        <Link to="/">Products</Link>

        {/* Show cart only for user */}
        {userLoggedIn && (
          <Link to="/user/cart">
            Cart ({count})
          </Link>
        )}

        {/* LOGIN / LOGOUT TOGGLE */}
        {!isLoggedIn ? (
          <>
            <Link to="/user/login">User Login</Link>
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/seller/login">Seller Login</Link>
          </>
        ) : (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>
    </div>
  )
}