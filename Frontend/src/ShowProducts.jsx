import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../axios"
import { useCart } from "./CartContext"
import { useWishlist } from "./WishlistContext"
import { FaHeart, FaRegHeart } from "react-icons/fa"

export default function ShowProducts() {
  useEffect(() => {
    document.title = "All Products"
  }, [])

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const { fetchCart } = useCart()
  const [category, setCategory] = useState("")
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useWishlist()
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get(`/product/show?search=${search}&category=${category}`)
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
    fetchCart()
  }, [search,category])

  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <h1>Discover Amazing Products</h1>
        <p>Shop the latest trends with unbeatable prices</p>
      </div>

      <div className="container">

        <h2 className="section-title">All Products</h2>
        <div className="search-filter-container">

          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="category-buttons">

            <button onClick={() => setCategory("")}>
              All
            </button>

            <button onClick={() => setCategory("Men")}>
              Men
            </button>

            <button onClick={() => setCategory("Women")}>
              Women
            </button>

            <button onClick={() => setCategory("Shoes")}>
              Shoes
            </button>

            <button onClick={() => setCategory("Electronics")}>
              Electronics
            </button>

          </div>

        </div>

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
                  <button
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.preventDefault()

                      if (isInWishlist(product._id)) {
                        removeFromWishlist(product._id)
                      } else {
                        addToWishlist(product._id)
                      }
                    }}
                  >
                    {isInWishlist(product._id)
                      ? <FaHeart />
                      : <FaRegHeart />
                    }
                  </button>

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