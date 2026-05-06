import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../axios"
import { useCart } from "./CartContext"

export default function ShowProducts() {
  useEffect(() => {
    document.title = "All Products"
  }, [])

  const [products, setProducts] = useState([])
  const { fetchCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/product/show")
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
    fetchCart()
  }, [])

  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <h1>Discover Amazing Products</h1>
        <p>Shop the latest trends with unbeatable prices</p>
      </div>

      <div className="container">

        <h2 className="section-title">All Products</h2>

        <div className="product-grid">
          {products.map(product => {
            const firstVariant = product.variants?.[0]

            const imageUrl =
              firstVariant?.images?.[0] ||
              "https://via.placeholder.com/300"

            return (
              <Link
                key={product._id}
                to={`/singleproduct/${product._id}`}
                className="product-link"
              >
                <div className="product-card">

                  <div className="image-wrapper">
                    <img src={imageUrl} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="desc">{product.description}</p>

                    <p className="price">
                      ₹ {firstVariant?.price || "N/A"}
                    </p>
                  </div>

                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}