import wishlistModel from "../model/wishlistSchema.js"


// ADD TO WISHLIST
export async function addWishlist(req, res) {
  try {

    const userId = req.user.id
    const {productId} = req.body

    // CHECK IF ALREADY EXISTS
    const existing = await wishlistModel.findOne({
      userId,
      productId
    })

    if (existing) {
      return res.status(400).json({
        message: "Product already in wishlist"
      })
    }

    // CREATE
    await wishlistModel.create({
      userId,
      productId
    })

    res.status(201).json({
      message: "Added to wishlist"
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })
  }
}


// REMOVE FROM WISHLIST
export async function removeWishlist(req, res) {
  try {

    const userId = req.user.id
    const {productId} = req.params

    await wishlistModel.findOneAndDelete({
      userId,
      productId
    })

    res.json({
      message: "Removed from wishlist"
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })
  }
}


// SHOW WISHLIST
export async function showWishlist(req, res) {
  try {

    const userId = req.user.id

    const wishlist = await wishlistModel.find({
      userId
    }).populate("productId")

    res.json(wishlist)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Server Error"
    })
  }
}