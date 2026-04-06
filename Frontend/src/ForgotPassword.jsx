import React, { useState } from "react"
import axios from "axios"

export default function ForgotPassword() {

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:3000/user/forgot-password",
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