import React, { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import api from "../axios"
import { useCart } from "./CartContext"
import useTitle from "./hooks/UseTitle"
import { useAuth } from "./AuthContext"

export default function SingleProduct() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)

  useTitle(product?.name || "Loading...")

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()
  const { isLoggedIn } = useAuth()

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
      const response = await api.get(`/product/single/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (product?.variants?.length) {
      setSelectedVariant(product.variants[0])
    }
  }, [product])

  function handleIncrease() {
    if (!isLoggedIn) return navigate("/user/login")

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

  if (!product || !selectedVariant) return <p className="container">Loading...</p>

  return (
    <div className="container">
      <div className="single-product modern-product">

        {/* LEFT: IMAGE SECTION */}
        <div className="image-section">
          <img
            src={selectedVariant.images?.[0]}
            alt={product.name}
            className="main-image"
          />

          <div className="thumbnail-row">
            {selectedVariant.images.map((img, index) => (
              <img key={index} src={img} alt="thumb" />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="details-section">

          <h1 className="product-title">{product.name}</h1>

          <p className="product-desc">{product.description}</p>

          <p className="price big-price">
            ₹ {selectedVariant.price}
          </p>

          {/* COLOR */}
          <div className="variant-group">
            <h4>Color</h4>
            <div className="variant-options">
              {product.variants.map((v, index) => (
                <button
                  key={index}
                  className={
                    selectedVariant._id === v._id ? "selected variant-btn" : "variant-btn"
                  }
                  onClick={() => setSelectedVariant(v)}
                >
                  {v.color}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="variant-group">
            <h4>Size</h4>
            <div className="variant-options">
              {product.variants.map((v, index) => (
                <button
                  key={index}
                  className={
                    selectedVariant._id === v._id ? "selected variant-btn" : "variant-btn"
                  }
                  onClick={() => setSelectedVariant(v)}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          {/* CART */}
          <div className="cart-section">
            {quantity === 0 ? (
              <button className="add-btn" onClick={handleIncrease}>
                Add to Cart
              </button>
            ) : (
              <div className="quantity-box modern-qty">
                <button onClick={handleDecrease}>−</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}