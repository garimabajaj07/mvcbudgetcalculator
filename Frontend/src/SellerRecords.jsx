import { useState, useEffect } from 'react'
import api from '../axios'

export default function SellerRecords() {

    const [tabdata, setTabData] = useState([])
    const [editSeller, setEditSeller] = useState(null)

    useEffect(() => {
        document.title = "Seller Records"
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const res = await api.get("/admin/seller/records", {
                withCredentials: true
            })
            setTabData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // DELETE USER
    async function handleDelete(id) {
        try {
            await api.delete(`/admin/seller/delete/${id}`, {
                withCredentials: true
            })

            setTabData(prev => prev.filter(seller => seller._id !== id))

        } catch (error) {
            console.log(error)
        }
    }

    //  BLOCK / UNBLOCK
   async function handleBlock(id) {
  try {
    const res = await api.put(
      `/admin/block-seller/${id}`,
      {},
      { withCredentials: true }
    )

    const updatedStatus = res.data.status   //  IMPORTANT

    setTabData(prev =>
      prev.map(seller =>
        seller._id === id
          ? { ...seller, status: updatedStatus }
          : seller
      )
    )

  } catch (error) {
    console.log(error)
  }
}

    //  EDIT
    function handleEdit(seller) {
        setEditSeller(seller)
    }

    function handleEditChange(e) {
        const { name, value } = e.target
        setEditSeller(prev => ({ ...prev, [name]: value }))
    }

    async function handleUpdate() {
        try {
            await api.put(
                `/admin/seller/edit/${editSeller._id}`,
                editSeller,
                { withCredentials: true }
            )

            // update UI
            setTabData(prev =>
                prev.map(seller =>
                    seller._id === editSeller._id ? editSeller : seller
                )
            )

            setEditSeller(null)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="table-container">

                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>Block</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tabdata.map(seller => (
                            <tr key={seller._id}>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.status || "active"}</td>

                                {/* DELETE */}
                                <td
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDelete(seller._id)}
                                >
                                    🗑️
                                </td>

                                {/* EDIT */}
                                <td
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleEdit(seller)}
                                >
                                    ✏️
                                </td>

                                {/* BLOCK / UNBLOCK */}
                                <td
                                    style={{
                                        cursor: 'pointer',
                                        color: seller.status === "blocked" ? "green" : "red"
                                    }}
                                    onClick={() => handleBlock(seller._id)}
                                >
                                    {seller.status === "blocked" ? "Unblock" : "Block"}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ EDIT FORM */}
            {editSeller && (
                <div className='edit-form'>
                    <h3>Edit Seller</h3>

                    <input
                        type="text"
                        name="name"
                        value={editSeller.name}
                        onChange={handleEditChange}
                    />

                    <input
                        type="email"
                        name="email"
                        value={editSeller.email}
                        onChange={handleEditChange}
                    />

                    <div className='edit-actions'>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={() => setEditSeller(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}