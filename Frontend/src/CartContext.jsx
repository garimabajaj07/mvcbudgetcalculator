import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const CartContext = createContext()
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  async function fetchCart() {
    try {
      const res = await axios.get(
        "http://localhost:3000/cart",
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
      await axios.post(
        "http://localhost:3000/cart/add",
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
      await axios.post(
        "http://localhost:3000/cart/decrease",
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
      await axios.post(
        "http://localhost:3000/cart/add",
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
      await axios.delete(
        `http://localhost:3000/cart/remove/${productId}`,
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

