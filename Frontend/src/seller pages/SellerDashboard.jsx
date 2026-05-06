import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function SellerDashboard() {
  useEffect(() => {
    document.title = "Seller Dashboard"
  }, [])

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>Seller Dashboard</h2>

      <div className="dashboard-grid">
        <Link to="/seller/product/add" className="dashboard-card">
          <h3>Add Product</h3>
          <p>Create and upload new products</p>
        </Link>

        <Link to="/seller/product/list" className="dashboard-card">
          <h3>Product List</h3>
          <p>Manage your existing products</p>
        </Link>
      </div>
    </div>
  )
}