import React, { useEffect, useState } from "react"
import api from "../../axios"
import { data, useNavigate } from "react-router-dom"

export default function SellerProductList() {

  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await api.get("/seller/myproducts", {
        withCredentials: true
      })
      setProducts(res.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
      setSelected(products.map(p => p._id))
    } else {
      setSelected([])
    }
  }

  // Delete selected
  async function handleDelete() {
    try {
      await api.delete(
        "/seller/delete-multiple",
        {
          data: { ids: selected },
          withCredentials: true
        }
      )

      alert("Products deleted successfully")
      setSelected([])
      fetchProducts()

    } catch (error) {
      console.log(error)
    }
  }

  // Loading state
  if (loading) return <h2>Loading products...</h2>

  // Empty state
  if (products.length === 0) {
    return (
      <div className="container">
        <h2>No products added yet</h2>
        <button onClick={() => navigate("/seller/addproduct")}>
          + Add Product
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Your Products</h2>

      <button onClick={() => navigate("/seller/addproduct")}>
        + Add Product
      </button>

      <button
        onClick={handleDelete}
        disabled={selected.length === 0}
        style={{ marginLeft: "10px" }}
      >
        Delete Selected
      </button>

      <table border="1" width="100%" cellPadding="10">
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => {

            const firstVariant = product.variants?.[0]

            const imageUrl = firstVariant?.images?.[0]
              ? `${import.meta.env.VITE_BASEURL}/uploads/${firstVariant.images[0]}`
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
                  />
                </td>

                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>₹ {price}</td>

                <td>
                  <button
                    onClick={() => navigate(`/seller/edit/${product._id}`)}
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
  )
}