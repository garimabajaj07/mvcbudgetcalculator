import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AdminHome() {
  useEffect(() => {
    document.title = "Admin Home"
  }, [])
  return (
    <>
    <Link to="/admin/records">Records</Link>
    <Link to="/admin/product-table">Product-list</Link>
    </>
  )
}
