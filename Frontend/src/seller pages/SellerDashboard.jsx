import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function SellerDashboard() {
  useEffect(() => {
    document.title = "Seller Dashboard"
  }, [])
return (
    <>
    <Link to="/seller/addproduct">Add Product</Link>
    <Link to="/seller/productlist">Product-list</Link>
    </>
  )
}
