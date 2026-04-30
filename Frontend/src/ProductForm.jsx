import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../axios"

export default function ProductForm() {
  useEffect(() => {
    document.title = "Add Product"
  }, [])

  const navigate = useNavigate()

  const [data, setData] = useState({
    name: "",
    description: ""
  })

  const [variants, setVariants] = useState([
    { color: "", size: "", price: "", images: [] }
  ])

  function handleChange(e) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  function handleVariantChange(index, e) {
    const { name, value } = e.target

    const updated = [...variants]
    updated[index][name] = value

    setVariants(updated)
  }

  function handleImageChange(index, e) {
    const files = Array.from(e.target.files)

    const updated = [...variants]
    updated[index].images = files

    setVariants(updated)
  }

  function addVariant() {
    setVariants([
      ...variants,
      { color: "", size: "", price: "", images: [] }
    ])
  }

  async function handleSubmit(e) {
  e.preventDefault()

  const formData = new FormData()

  formData.append("name", data.name)
  formData.append("description", data.description)

  //  filtering variants
  const validVariants = variants.filter(
    v => v.color && v.size && v.price
  )

  //  sending data 
  const variantsData = validVariants.map(v => ({
    color: v.color,
    size: v.size,
    price: Number(v.price)
  }))

  formData.append("variants", JSON.stringify(variantsData))

  //  attaching images 
  validVariants.forEach((variant, index) => {
    if (variant.images && variant.images.length > 0) {
      variant.images.forEach(file => {
        formData.append(`images_${index}`, file)
      })
    }
  })

  try {
    const res = await api.post("/product/addproduct", formData, {
      withCredentials: true
    })

    alert(res.data.message)
    navigate("/showproducts")

  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <h3>Variants</h3>

        {variants.map((variant, index) => (
          <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>

            <input
              type="text"
              name="color"
              placeholder="Color"
              onChange={(e) => handleVariantChange(index, e)}
            />

            <input
              type="text"
              name="size"
              placeholder="Size"
              onChange={(e) => handleVariantChange(index, e)}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={(e) => handleVariantChange(index, e)}
            />

            <input
              type="file"
              multiple
              onChange={(e) => handleImageChange(index, e)}
            />

          </div>
        ))}

        <button type="button" onClick={addVariant}>
          + Add Variant
        </button>

        <br /><br />

        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}