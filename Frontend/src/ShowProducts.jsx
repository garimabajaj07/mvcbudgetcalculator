import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../axios"
import "./App.css"
import { useCart } from "./CartContext"

export default function ShowProducts() {

  const [products, setProducts] = useState([])
  const { fetchCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/product/showproducts")
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
    fetchCart()
  }, [])

  return (
    <div className="container">
      <div className="product-grid">
        {products.map(product => {

          const firstVariant = product.variants?.[0]

          return (
            <Link key={product._id} to={`/singleproduct/${product._id}`}>

              <div className="product-card">

                <img
                  src={`${import.meta.env.VITE_BASEURL}/uploads/${firstVariant?.images?.[0]}`}
                  alt={product.name}
                />

                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <p className="price">
                  ₹ {firstVariant?.price}
                </p>

              </div>

            </Link>
          )
        })}
      </div>
    </div>
  )
}