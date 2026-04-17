import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../axios"
import { useCart } from "./CartContext"

export default function SingleProduct() {

  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()

  // find quantity based on variant
  let quantity = 0

  const cartItem = cart.find(item =>
    item.productId?._id === id &&
    item.variantId === selectedVariant?._id
  )

  if (cartItem) {
    quantity = cartItem.quantity
  }

  useEffect(() => {
    fetchSingleProduct()
  }, [id])

  async function fetchSingleProduct() {
    try {
      const response = await api.get(`/product/singleproduct/${id}`)
      setProduct(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  // set default variant
  useEffect(() => {
    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0])
    }
  }, [product])

  function handleIncrease() {
    if (quantity === 0) {
      addToCart(product._id, selectedVariant._id)
    } else {
      increaseQuantity(product._id, selectedVariant._id)
    }
  }

  function handleDecrease() {
    if (quantity > 0) {
      decreaseQuantity(product._id, selectedVariant._id)
    }
  }

  if (!product || !selectedVariant) return <p>Loading...</p>

  return (
    <div className="container">
      <div className="single-product">

        {/* Images */}
        <div>
          {selectedVariant.images.map((img, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_BASEURL}/uploads/${img}`}
              alt="product"
            />
          ))}
        </div>

        {/* Details */}
        <div>

          <h2>{product.name}</h2>
          <p>{product.description}</p>

          <p className="price">
            ₹ {selectedVariant.price}
          </p>

          {/* COLOR SELECTION */}
          <div>
            <h4>Select Color:</h4>
            {product.variants.map((v, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(v)}
              >
                {v.color}
              </button>
            ))}
          </div>

          {/* SIZE SELECTION */}
          <div>
            <h4>Select Size:</h4>
            {product.variants.map((v, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(v)}
              >
                {v.size}
              </button>
            ))}
          </div>

          {/* CART */}
          {quantity === 0 ? (
            <button onClick={() => addToCart(product._id, selectedVariant._id)}>
              Add to Cart
            </button>
          ) : (
            <div className="quantity-box">
              <button onClick={handleDecrease}>-</button>
              <button>{quantity}</button>
              <button onClick={handleIncrease}>+</button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}