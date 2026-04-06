import React, { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useCart } from "./CartContext"
import api from "../axios"

export default function Logout() {

  const navigate = useNavigate()
  const { clearCart } = useCart()

  useEffect(() => {
    async function logoutUser() {
      try {
        await api.get(
          "/user/logout",
          { withCredentials: true }
        )

        clearCart()   // RESET CART HERE

        navigate("/login")

      } catch (error) {
        console.log(error)
      }
    }

    logoutUser()
  }, [])

  return <h2>Logging out...</h2>
}