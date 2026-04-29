import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../../axios'

const SellerContext = createContext()
export const useSeller = () => useContext(SellerContext)

export function SellerProvider({ children }) {

  const [data, setData] = useState({
    username: "",
    password: ""
  })

  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check login on refresh
  useEffect(() => {
    checkLogin()
  }, [])

  async function checkLogin() {
    try {
      await api.get("/seller/checkseller", {
        withCredentials: true
      })
      setIsLoggedIn(true)
    } catch {
      setIsLoggedIn(false)
    }
  }

  // LOGIN
  async function loginSeller() {
    try {
      const res = await api.post("/seller/login", data,
        { withCredentials: true }
      )

      setIsLoggedIn(true)
      setError("")
      return res

    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      setIsLoggedIn(false)
    }
  }

  //  LOGOUT


  return (
    <SellerContext.Provider value={{
      data,
      setData,
      error,
      setError,
      isLoggedIn,
      loginSeller
    }}>
      {children}
    </SellerContext.Provider>
  )
}