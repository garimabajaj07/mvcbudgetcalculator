import React, { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Logout() {

  const navigate = useNavigate()

  useEffect(() => {
    async function logoutUser() {
      try {
        const res = await axios.get(
          "http://localhost:3000/user/logout",
          { withCredentials: true }
        )

        console.log(res.data.message)

        // redirect to login after logout
        navigate("/login")

      } catch (error) {
        console.log(error)
      }
    }

    logoutUser()
  }, [])

  return <h2>Logging out...</h2>
}