import React, { useState } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

export default function ResetPassword() {

  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await axios.put(
        `http://localhost:3000/user/reset-password/${token}`,
        { password }
      )

      setMessage(res.data.message)

      setTimeout(() => {
        navigate("/login")
      }, 2000)

    } catch (error) {
      setMessage(error.response?.data?.message || "Error")
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Update Password</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  )
}