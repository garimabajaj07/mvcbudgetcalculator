import React, { useEffect, useState } from "react"
import api from "../../axios"

export default function ProductTable() {

  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await api.get("/product/showproducts")
      setProducts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // Toggle single checkbox
  function handleCheckbox(id) {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  //  Select All
  function handleSelectAll(e) {
    if (e.target.checked) {
      const allIds = products.map(p => p._id)
      setSelected(allIds)
    } else {
      setSelected([])
    }
  }

  // Delete selected
  async function handleDelete() {
    try {
      await api.post("/admin/delete-multiple", {
        ids: selected
      },
        {
          withCredentials: true
        })

      alert("Products deleted successfully")
      fetchProducts()
      setSelected([])

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h2>Product Table</h2>

      <button onClick={handleDelete} disabled={selected.length === 0}>
        Delete Selected
      </button>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>
              {/*  Select All Checkbox */}
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
          </tr>
        </thead>

        <tbody>
          {products.map(product => (
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
                  src={`${import.meta.env.VITE_BASEURL}/uploads/${product.images[0]}`}
                  width="60"
                  alt={product.name}
                />
              </td>

              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>₹ {product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}