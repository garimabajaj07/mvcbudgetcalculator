import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import api from "../axios"

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  async function fetchCart() {
    try {
      const res = await api.get(
        "/cart",
        { withCredentials: true }
      )
      setCart(res.data.items || [])
    } catch (error) {
      setCart([])
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  async function addToCart(productId) {
    try {
      await api.post(
        "/cart/add",
        { productId },
        { withCredentials: true }
      )

      fetchCart() // refresh UI
    } catch (error) {
      console.log(error)
    }
  }

  async function decreaseQuantity(productId) {
    try {
      await api.post(
        "/cart/decrease",
        { productId },
        { withCredentials: true }
      )

      fetchCart()
    } catch (error) {
      console.log(error)
    }
  }

  async function increaseQuantity(productId) {
    try {
      await api.post(
        "/cart/add",
        { productId },
        { withCredentials: true }
      )

      fetchCart()
    } catch (error) {
      console.log(error)
    }
  }
  async function removeFromCart(productId) {
    try {
      await api.delete(
        `/cart/remove/${productId}`,
        { withCredentials: true }
      )

      fetchCart() // refresh UI

    } catch (error) {
      console.log(error)
    }
  }

  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      fetchCart,
      decreaseQuantity,
      increaseQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

