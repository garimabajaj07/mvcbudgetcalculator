import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AdminHome() {
  useEffect(() => {
    document.title = "Admin Home"
  }, [])
  return (
    <>
    <Link to="/admin/user/records">User Records</Link>
    <Link to="/admin/seller/records">Seller Records</Link>
    <Link to="/admin/product/records">Product-list</Link>
    </>
  )
}
