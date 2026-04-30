import Product from "../model/productSchema.js"

export async function addProduct(req, res) {
  try {
    const { name, description, variants } = req.body  

    // parse variants
    let parsedVariants = JSON.parse(variants)

    const files = req.files || []

    // attach images to correct variant
    parsedVariants = parsedVariants.filter(v => v.color && v.size && v.price) // remove empty variants
      .map((variant, index) => {

        const variantImages = files
          .filter(file => file.fieldname === `images_${index}`)
          .map(file => file.filename)

        return {
          color: variant.color,
          size: variant.size,
          price: Number(variant.price),
          images: variantImages
        }
      })

    // safety check
    if (parsedVariants.length === 0) {
      return res.status(400).json({
        message: "At least one valid variant is required"
      })
    }

    const product = new Product({
      name,
      description,
      variants: parsedVariants
    })

    await product.save()

    res.json({ message: "Product added successfully", product })

  } catch (error) {
    console.log(error)
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
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" })
    }

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    await Product.findByIdAndDelete(id)

    res.json({ message: "Product deleted successfully" })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
export async function editProduct(req, res) {
  try {
    const { id } = req.params
    const { name, description, variants } = req.body

    const parsedVariants = JSON.parse(variants)

    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    // update basic fields
    product.name = name
    product.description = description

    // handle images for variants
    let imageIndex = 0

    const updatedVariants = parsedVariants.map((variant, i) => {
      const files = req.files.filter(file =>
        file.fieldname === `images_${i}`
      )

      const images = files.map(file => file.path)

      return {
        ...variant,
        images: images.length > 0 ? images : product.variants[i]?.images || []
      }
    })

    product.variants = updatedVariants

    await product.save()

    res.json({ message: "Product updated successfully" })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}