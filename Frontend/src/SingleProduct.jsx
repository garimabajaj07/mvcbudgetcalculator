import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from './CartContext'
import api from '../axios'

export default function SingleProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart()

    let quantity = 0

    const cartItem = cart.find(item => item.productId._id === id)

    if (cartItem) {
        quantity = cartItem.quantity
    }

    useEffect(() => { fetchSingleProduct(id) },
        [id])

    async function fetchSingleProduct() {
        try {
            const response = await api.get(`/product/singleproduct/${id}`)
            console.log(response.data);

            setProduct(response.data)


        } catch (error) {
            console.log(error);

        }

    }

    function handleIncrease() {
        if (quantity === 0) {
            addToCart(product._id)
        } else {
            increaseQuantity(product._id)
        }
    }

    function handleDecrease() {
        if (quantity > 0) {
            decreaseQuantity(product._id)
        }
    }
    

    if (!product) return <p>Loading...</p>
    return (
        <div className="container">
            <div className="single-product">

                <div>
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={`${import.meta.env.VITE_BASEURL}/uploads/${img}`}
                        />
                    ))}
                </div>

                <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="price">₹ {product.price}</p>

                    {quantity === 0 ? (
                        <button onClick={() => addToCart(product._id)}>
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
