import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Login() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    username: "",
    password: ""
  })

  const [error, setError] = useState("")

  function handleChange(e) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:3000/user/login",
        data,
        { withCredentials: true }

      )
      setData(
        {
          username:"",
          password:""
          
        }
      )
      navigate("/records")

      alert(res.data.message)
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}