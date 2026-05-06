import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../axios"

export default function EditProduct() {
  useEffect(() => {
    document.title = "Edit Product"
  }, [])

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

      const updatedVariants = res.data.variants.map(v => ({
        ...v,
        newImages: []
      }))

      setVariants(updatedVariants)

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
    updated[index].newImages = files
    setVariants(updated)
  }

  function addVariant() {
    setVariants([
      ...variants,
      { color: "", size: "", price: "", images: [], newImages: [] }
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
      price: Number(v.price),
      images: v.images
    }))

    formData.append("variants", JSON.stringify(variantsData))

    variants.forEach((variant, index) => {
      if (variant.newImages?.length > 0) {
        variant.newImages.forEach(file => {
          formData.append(`images_${index}`, file)
        })
      }
    })

    try {
      await api.put(`/product/edit/${id}`, formData, {
        withCredentials: true
      })

      alert("Product updated successfully")
      navigate("/admin/product/records")

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="page">
      <div className="container">

        <div className="form-card">
          <h2>Edit Product</h2>

          <form onSubmit={handleSubmit} className="form-grid">

            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Product Name"
            />

            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Product Description"
            />

            <div className="variant-section">
              <div className="variant-header">
                <h3>Variants</h3>
                <button type="button" onClick={addVariant}>
                  + Add Variant
                </button>
              </div>

              {variants.map((variant, index) => (
                <div className="variant-card" key={index}>

                  <div className="variant-grid">
                    <input
                      type="text"
                      name="color"
                      value={variant.color}
                      onChange={(e) => handleVariantChange(index, e)}
                      placeholder="Color"
                    />

                    <input
                      type="text"
                      name="size"
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, e)}
                      placeholder="Size"
                    />

                    <input
                      type="number"
                      name="price"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, e)}
                      placeholder="Price"
                    />
                  </div>

                  {/* Existing Images */}
                  <div className="image-preview">
                    {variant.images?.map((img, i) => (
                      <img key={i} src={img} alt="preview" />
                    ))}
                  </div>

                  {/* Upload New */}
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleImageChange(index, e)}
                  />

                </div>
              ))}
            </div>

            <button type="submit" className="submit-btn">
              Update Product
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}