import { Link, useNavigate } from "react-router-dom"
import { useSeller } from "./SellerContext"
import { useEffect } from "react"

export default function SellerLogin() {
  useEffect(() => {
    document.title = "Seller Login"
  }, [])

  const navigate = useNavigate()

  const { data, setData, error, loginSeller } = useSeller()

  function handleChange(e) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const res = await loginSeller()

    if (res) {
      setData({
        username: "",
        password: ""
      })

      alert(res.data.message)
      navigate("/seller/dashboard")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
          <h2>Seller Login</h2>
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
              <Link to="/seller/register">Register</Link>
            </span>
          </div>

          <button type="submit">Login</button>

        </form>
      </div>
    </div>
  )
}