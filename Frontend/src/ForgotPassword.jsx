import React, { useEffect, useState } from "react"
import axios from "axios"
import api from "../axios"

export default function ForgotPassword() {
  useEffect(() => {
    document.title = "Forgot password"
  }, [])

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await api.post(
        "/user/forgot-password",
        { email }
      )

      setMessage(res.data.message)

    } catch (error) {
      setMessage(error.response?.data?.message || "Error")
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send Reset Link</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  )
}