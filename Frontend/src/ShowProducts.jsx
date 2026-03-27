import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

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

      {products.map(product => (
      
        <Link key={product._id} to={`/singleproduct/${product._id}`}>
        <div key={product._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          

          {/* Images */}
          <div style={{ display: "flex", gap: "10px" }}>
            {product.images.map((img, index) => (
              <img
              key={index}
              src={`http://localhost:3000/uploads/${img}`}
              alt="product"
              width="120"
              />
            ))}
          </div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>₹ {product.price}</p>

        </div>
        </Link>
        
      ))}

    </div>
  )
}
