import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AdminHome() {
  useEffect(() => {
    document.title = "Admin Dashboard"
  }, [])

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>Admin Dashboard</h2>

      <div className="dashboard-grid">
        <Link to="/admin/user/records" className="dashboard-card">
          <h3>User Records</h3>
          <p>View all registered users</p>
        </Link>

        <Link to="/admin/seller/records" className="dashboard-card">
          <h3>Seller Records</h3>
          <p>Manage sellers</p>
        </Link>

        <Link to="/admin/product/records" className="dashboard-card">
          <h3>Product List</h3>
          <p>View and control products</p>
        </Link>
      </div>
    </div>
  )
}