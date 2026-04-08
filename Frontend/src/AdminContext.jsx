import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from "axios"
import api from '../axios'

const AdminContext = createContext()
export const useAdmin = () => useContext(AdminContext)

export function AdminProvider({ children }) {

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
      await api.get("/user/checklogin", {
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
      const res = await api.post(
        "/user/login",
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
      await api.get("/user/logout", {
        withCredentials: true
      })

      setIsLoggedIn(false)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AdminContext.Provider value={{
      data,
      setData,
      error,
      setError,
      isLoggedIn,
      loginUser,
      logoutUser
    }}>
      {children}
    </AdminContext.Provider>
  )
}