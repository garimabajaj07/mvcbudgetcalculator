import React, { createContext, useContext, useState, useEffect } from 'react'
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
      await api.get("/admin/checkadmin", {
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
      const res = await api.post("/admin/login", data,
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

  return (
    <AdminContext.Provider value={{
      data,
      setData,
      error,
      setError,
      isLoggedIn,
      loginUser
    }}>
      {children}
    </AdminContext.Provider>
  )
}