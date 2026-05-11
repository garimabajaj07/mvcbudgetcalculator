import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useWishlist } from "./WishlistContext"

export default function Wishlist() {

  useEffect(() => {
    document.title = "Wishlist"
  }, [])

  const { wishlist, removeFromWishlist } = useWishlist()

  return (
    <div className="container">

      <h2 className="cart-title">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="empty-cart">
          <h3>Your wishlist is empty ❤️</h3>
        </div>
      ) : (

        <div className="product-grid">

          {wishlist.map(item => {

            const product = item.productId

            const firstVariant = product?.variants?.[0]

            return (
              <div className="product-card" key={item._id}>

                <Link to={`/singleproduct/${product._id}`}>

                  <img
                    src={firstVariant?.images?.[0]}
                    alt={product?.name}
                  />

                  <h4>{product?.name}</h4>

                  <p className="price">
                    ₹ {firstVariant?.price}
                  </p>

                </Link>

                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  Remove
                </button>

              </div>
            )
          })}

        </div>
      )}

    </div>
  )
}