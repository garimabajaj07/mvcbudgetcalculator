import { createContext, useContext, useEffect, useState } from "react"
import api from "../axios"

const WishlistContext = createContext()

export function WishlistProvider({ children }) {

    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        fetchWishlist()
    }, [])

    async function fetchWishlist() {
        try {
            const res = await api.get("/wishlist/show", {
                withCredentials: true
            })

            setWishlist(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    async function addToWishlist(productId) {
        try {
            await api.post(
                '/wishlist/add',
                { productId },
                { withCredentials: true }
            )

            fetchWishlist()

        } catch (error) {
            console.log(error)
        }
    }

    async function removeFromWishlist(productId) {
        try {
            await api.delete(`/wishlist/remove/${productId}`, {
                withCredentials: true
            })

            fetchWishlist()

        } catch (error) {
            console.log(error)
        }
    }

    function isInWishlist(productId) {
        return wishlist.some(
            item => item.productId?._id === productId
        )
    }
    function clearWishlist() {
        setWishlist([])
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    return useContext(WishlistContext)
}