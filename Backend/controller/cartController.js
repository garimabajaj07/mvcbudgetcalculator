import Cart from "../model/cartSchema.js"

// ADD TO CART
export async function addToCart(req, res) {
    try {
        const userId = req.user.id
        const { productId, variantId } = req.body
        console.log(variantId);

        let cart = await Cart.findOne({ userId })


        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, variantId, quantity: 1 }]
            })
        } else {
            const index = cart.items.findIndex(
                item => item.productId.toString() === productId &&
                    item.variantId &&
                    item.variantId.toString() === variantId
            )

            if (index > -1) {
                cart.items[index].quantity += 1
            } else {
                cart.items.push({ productId, variantId, quantity: 1 })
            }
        }

        await cart.save()
        res.json({ message: "Added to cart" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

// GET CART
export async function getCart(req, res) {
    try {

        const userId = req.user.id

        const cart = await Cart.findOne({ userId })
            .populate("items.productId")

        if (!cart) {
            res.json({ items: [] })
        }
        // REMOVE ITEMS WHERE PRODUCT IS DELETED / NULL
        cart.items = cart.items.filter(item => item.productId)

        res.json(cart)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//decrease quantity
export async function decreaseQuantity(req, res) {
    try {
        const userId = req.user.id
        const { productId, variantId } = req.body

        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.json({ message: "Cart not found" })
        }

        const index = cart.items.findIndex(
            item => item.productId.toString() === productId &&
                item.variantId &&
                item.variantId.toString() === variantId
        )

        if (index > -1) {
            cart.items[index].quantity -= 1

            // remove item if quantity becomes 0
            if (cart.items[index].quantity <= 0) {
                cart.items.splice(index, 1)
            }
        }

        await cart.save()

        res.json({ message: "Quantity decreased" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//remove item

export async function removeFromCart(req, res) {
    try {
        const userId = req.user.id
        const { productId, variantId } = req.params

        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        // remove item

        cart.items = cart.items.filter(

            item =>
                !(item.productId.toString() === productId &&
                    item.variantId &&
                    item.variantId.toString() === variantId)
        )

        await cart.save()

        res.json({ message: "Item removed" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
