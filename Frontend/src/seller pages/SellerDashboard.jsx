import React from 'react'
import { Link } from 'react-router-dom'

export default function SellerDashboard() {
return (
    <>
    <Link to="/seller/addproduct">Add Product</Link>
    <Link to="/seller/productlist">Product-list</Link>
    </>
  )
}
