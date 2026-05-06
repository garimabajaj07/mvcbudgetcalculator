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
    <div className="auth-container">
      <div className="auth-card">
          <h2>User Login</h2>
        <form onSubmit={handleSubmit}>

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

          <div className="auth-links">
            <span className="link-btn" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>

            <span>
              Don’t have an account?{" "}
              <Link to="/user/register">Register</Link>
            </span>
          </div>

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  )
}