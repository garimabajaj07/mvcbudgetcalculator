import { useState, useEffect } from 'react'
import api from '../axios'

export default function UserRecords() {

    const [tabdata, setTabData] = useState([])
    const [editUser, setEditUser] = useState(null)

    useEffect(() => {
        document.title = "User Records"
        fetchData()
    }, [])

    async function fetchData() {
        try {
            const res = await api.get("/admin/user/records", {
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
            await api.delete(`/admin/user/delete/${id}`, {
                withCredentials: true
            })

            setTabData(prev => prev.filter(user => user._id !== id))

        } catch (error) {
            console.log(error)
        }
    }

    //  BLOCK / UNBLOCK
   async function handleBlock(id) {
  try {
    const res = await api.put(
      `/admin/block-user/${id}`,
      {},
      { withCredentials: true }
    )

    const updatedStatus = res.data.status   //  IMPORTANT

    setTabData(prev =>
      prev.map(user =>
        user._id === id
          ? { ...user, status: updatedStatus }
          : user
      )
    )

  } catch (error) {
    console.log(error)
  }
}

    //  EDIT
    function handleEdit(user) {
        setEditUser(user)
    }

    function handleEditChange(e) {
        const { name, value } = e.target
        setEditUser(prev => ({ ...prev, [name]: value }))
    }

    async function handleUpdate() {
        try {
            await api.put(
                `/admin/user/edit/${editUser._id}`,
                editUser,
                { withCredentials: true }
            )

            // update UI
            setTabData(prev =>
                prev.map(user =>
                    user._id === editUser._id ? editUser : user
                )
            )

            setEditUser(null)

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
                        {tabdata.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.status || "active"}</td>

                                {/* DELETE */}
                                <td
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDelete(user._id)}
                                >
                                    🗑️
                                </td>

                                {/* EDIT */}
                                <td
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleEdit(user)}
                                >
                                    ✏️
                                </td>

                                {/* BLOCK / UNBLOCK */}
                                <td
                                    style={{
                                        cursor: 'pointer',
                                        color: user.status === "blocked" ? "green" : "red"
                                    }}
                                    onClick={() => handleBlock(user._id)}
                                >
                                    {user.status === "blocked" ? "Unblock" : "Block"}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ EDIT FORM */}
            {editUser && (
                <div className='edit-form'>
                    <h3>Edit User</h3>

                    <input
                        type="text"
                        name="name"
                        value={editUser.name}
                        onChange={handleEditChange}
                    />

                    <input
                        type="email"
                        name="email"
                        value={editUser.email}
                        onChange={handleEditChange}
                    />

                    <div className='edit-actions'>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={() => setEditUser(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}