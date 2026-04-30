import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AdminHome() {
  useEffect(() => {
    document.title = "Admin Home"
  }, [])
  return (
    <>
    <Link to="/admin/user/records">Records</Link>
    <Link to="/admin/product/records">Product-list</Link>
    </>
  )
}
