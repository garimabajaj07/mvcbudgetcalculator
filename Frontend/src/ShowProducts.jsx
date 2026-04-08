import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./App.css"
import api from "../axios"

export default function ShowProducts() {

  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await api.get("/product/showproducts")
      setProducts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  //  handle checkbox
  function handleCheckbox(id) {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(prev => prev.filter(item => item !== id))
    } else {
      setSelectedProducts(prev => [...prev, id])
    }
  }

  //  select all
  function handleSelectAll(e) {
    if (e.target.checked) {
      setSelectedProducts(products.map(p => p._id))
    } else {
      setSelectedProducts([])
    }
  }

  //  BULK DELETE
  async function handleBulkDelete() {
    try {
      setLoading(true)

      await Promise.all(
        selectedProducts.map(id =>
          api.delete(`/product/deleteproduct/${id}`, {
            withCredentials: true
          })
        )
      )

      alert("Selected products deleted")

      fetchProducts()
      setSelectedProducts([])

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">

      {/*  DELETE BUTTON */}
      <button
        onClick={handleBulkDelete}
        disabled={selectedProducts.length === 0 || loading}
        style={{ marginBottom: "15px" }}
      >
        {loading ? "Deleting..." : "Delete Selected"}
      </button>

      <div className="product-grid">

        {/*  SELECT ALL */}
        <div style={{ gridColumn: "1/-1" }}>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={
              products.length > 0 &&
              selectedProducts.length === products.length
            }
          /> Select All
        </div>

        {products.map(product => (
          <div key={product._id} className="product-card">

            {/* CHECKBOX */}
            <input
              type="checkbox"
              checked={selectedProducts.includes(product._id)}
              onChange={() => handleCheckbox(product._id)}
            />

            {/* keep navigation clickable */}
            <Link to={`/singleproduct/${product._id}`}>

              <img src={`${import.meta.env.VITE_BASEURL}/uploads/${product.images[0]}`} />

              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">₹ {product.price}</p>

            </Link>

          </div>
        ))}

      </div>
    </div>
  )
}