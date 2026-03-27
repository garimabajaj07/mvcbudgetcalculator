import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function SingleProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => { fetchSingleProduct(id) },
        [id])

    async function fetchSingleProduct() {
        try {
            const response = await axios.get(`http://localhost:3000/product/singleproduct/${id}`)
            console.log(response.data);

            setProduct(response.data)


        } catch (error) {
            console.log(error);
            
        }

    }

    if(!product) return <p>Loading...</p>

    return (
        <>
        <div>
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

        </>
    )
}
