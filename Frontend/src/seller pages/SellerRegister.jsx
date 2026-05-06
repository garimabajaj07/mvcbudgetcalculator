import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import "../App.css"
import api from '../../axios'

export default function SellerRegister() {
  useEffect(() => {
    document.title = "Seller Registeration"
  }, [])

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phoneNo: "",
    aadharNo: "",
    shopName: ""
  })

  const [error, setError] = useState("")

  function handleChange(e) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (data.name.length < 6) return setError("Name must be 6+ chars")
    if (data.password.length < 8) return setError("Password must be 8+ chars")
    if (data.phoneNo.length !== 10) return setError("Phone must be 10 digits")
    if (data.aadharNo.length !== 12) return setError("Aadhar no must be 12 digits")

    setError("")

    try {
      const res = await api.post("/seller/register", data)
      alert(res.data.message)
    } catch (err) {
      setError(err.response?.data?.message)
    }

    setData({
      name: "", username: "", email: "", password: "",
      phoneNo: "", shopName: "", aadharNo: ""
    })
  }
  return (
  <div className="auth-container">
    <div className="auth-card">
      <form onSubmit={handleSubmit}>

        <h2>Seller Register</h2>

        {error && <p className="error">{error}</p>}

        <input
          name='name'
          placeholder="Full Name"
          value={data.name}
          onChange={handleChange}
        />

        <input
          name='username'
          placeholder="Username"
          value={data.username}
          onChange={handleChange}
        />

        <input
          name='email'
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />

        <input
          name='password'
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
        />

        <input
          name='phoneNo'
          placeholder="Phone Number"
          maxLength={10}
          value={data.phoneNo}
          onChange={handleChange}
          inputMode='numeric'
        />

        <input
          name='aadharNo'
          placeholder="Aadhar Number"
          maxLength={12}
          value={data.aadharNo}
          onChange={handleChange}
          inputMode='numeric'
        />

        <input
          name='shopName'
          placeholder='Shop Name'
          value={data.shopName}
          onChange={handleChange}
        />

        <button type='submit'>Register</button>

        <div className="auth-links">
          <span>Already have an account? </span>
          <Link to="/seller/login">Login</Link>
        </div>

      </form>
    </div>
  </div>
)

}