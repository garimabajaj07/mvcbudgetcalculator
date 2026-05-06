import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../axios"

export default function ProductTable() {
  useEffect(() => {
    document.title = "Product Table"
  }, [])

  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await api.get("/product/show")
      setProducts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Toggle checkbox
  function handleCheckbox(id) {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  // Select all
  function handleSelectAll(e) {
    if (e.target.checked) {
      const allIds = products.map(p => p._id)
      setSelected(allIds)
    } else {
      setSelected([])
    }
  }

  // Delete
  async function handleDelete() {
    try {
      await api.post(
        "/admin/delete-multiple",
        { ids: selected },
        { withCredentials: true }
      )

      alert("Products deleted successfully")
      fetchProducts()
      setSelected([])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: "15px" }}>Product Table</h2>

      <button
        onClick={handleDelete}
        disabled={selected.length === 0}
        style={{ marginBottom: "15px" }}
      >
        Delete Selected
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    products.length > 0 &&
                    selected.length === products.length
                  }
                />
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => {
              const firstVariant = product.variants?.[0]

              // ✅ Cloudinary-safe image
              const imagePath = firstVariant?.images?.[0]

              const imageUrl = imagePath
                ? imagePath.startsWith("http")
                  ? imagePath
                  : `${import.meta.env.VITE_BASEURL}/${imagePath}`
                : "https://via.placeholder.com/60"

              const price = firstVariant?.price || "N/A"

              return (
                <tr key={product._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(product._id)}
                      onChange={() => handleCheckbox(product._id)}
                    />
                  </td>

                  <td>
                    <img
                      src={imageUrl}
                      width="60"
                      alt={product.name}
                      style={{ borderRadius: "6px" }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/60"
                      }}
                    />
                  </td>

                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>₹ {price}</td>

                  <td>
                    <button
                      onClick={() => navigate(`/product/edit/${product._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}