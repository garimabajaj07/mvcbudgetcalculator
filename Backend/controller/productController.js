import Product from "../model/productSchema.js"

export async function addProduct(req, res) {
  try {
    const { name, description, price } = req.body

    const imagePaths = req.files.map(file => file.filename)

    const product = new Product({
      name,
      description,
      price,
      images: imagePaths
    })

    await product.save()

    res.json({ message: "Product added successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function showProducts(req, res) {
  try {
    const products = await Product.find()
    res.json(products)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export async function singleProductDetail(req, res) {
  try {
    const { id } = req.params
    const singleProduct = await Product.findById(id)
    
     if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(singleProduct)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}