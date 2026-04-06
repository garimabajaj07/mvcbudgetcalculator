import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import "./App.css"

export default function ShowProducts() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:3000/product/showproducts")
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])

  return (
  <div className="container">
    <div className="product-grid">
      {products.map(product => (
        <Link key={product._id} to={`/singleproduct/${product._id}`}>
          
          <div className="product-card">

            <img src={`http://localhost:3000/uploads/${product.images[0]}`} />

            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">₹ {product.price}</p>

          </div>

        </Link>
      ))}
    </div>
  </div>
)
}
