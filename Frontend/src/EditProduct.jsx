import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../axios"

export default function EditProduct() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({
    name: "",
    description: ""
  })

  const [variants, setVariants] = useState([])

  useEffect(() => {
    fetchProduct()
  }, [])

  async function fetchProduct() {
    try {
      const res = await api.get(`/product/singleproduct/${id}`)
      setData({
        name: res.data.name,
        description: res.data.description
      })
      setVariants(res.data.variants)
    } catch (error) {
      console.log(error)
    }
  }

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

    const variantsData = variants.map(v => ({
      color: v.color,
      size: v.size,
      price: Number(v.price)
    }))

    formData.append("variants", JSON.stringify(variantsData))

    variants.forEach((variant, index) => {
      if (variant.images) {
        variant.images.forEach(file => {
          formData.append(`images_${index}`, file)
        })
      }
    })

    try {
      await api.put(`/product/editproduct/${id}`, formData, {
        withCredentials: true
      })

      alert("Product updated successfully")
      navigate("/admin/product-table")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
        />

        <h3>Variants</h3>

        {variants.map((variant, index) => (
          <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>

            <input
              type="text"
              name="color"
              value={variant.color}
              onChange={(e) => handleVariantChange(index, e)}
            />

            <input
              type="text"
              name="size"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, e)}
            />

            <input
              type="number"
              name="price"
              value={variant.price}
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

        <button type="submit">Update Product</button>
      </form>
    </div>
  )
}