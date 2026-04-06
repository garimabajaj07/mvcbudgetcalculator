import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from "axios"

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {

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
      await axios.get("http://localhost:3000/user/checklogin", {
        withCredentials: true
      })
      setIsLoggedIn(true)
    } catch {
      setIsLoggedIn(false)
    }
  }

  // LOGIN
  async function loginUser() {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        data,
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
  async function logoutUser() {
    try {
      await axios.get("http://localhost:3000/user/logout", {
        withCredentials: true
      })

      setIsLoggedIn(false)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{
      data,
      setData,
      error,
      setError,
      isLoggedIn,
      loginUser,
      logoutUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}