import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from './AuthContext'
import { useCart } from './CartContext'

export default function Login() {
useEffect(() => {
    document.title = "User Login"
  }, [])
  const navigate = useNavigate()

  const { data, setData, error, loginUser } = useAuth()

  function handleChange(e) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const res = await loginUser()

    if (res) {
      setData({
        username: "",
        password: ""
      })

      alert(res.data.message)
      navigate("/")
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <p
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
        <p>
          Or <Link to="/user/register"> Register?</Link>
        </p>

        <button type="submit">Login</button>

      </form>
    </div>
  )
}