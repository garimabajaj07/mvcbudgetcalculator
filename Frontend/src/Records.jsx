import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import api from '../axios';


export default function Records() {

    const [tabdata, setTabData] = useState([])
    const [editUser, setEditUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get("/user/records",
                    { withCredentials: true }
                )
                console.log(response);

                setTabData(response.data)

            } catch (error) {
                console.log(error);

            }
        }

        fetchData()
    }, [])

    async function handleDelete(id) {
        try {
            const response = await api.delete(`/user/deleteuser/${id}`,
                { withCredentials: true }
            )
            console.log(response);

            //remove deleted user by filtering

            setTabData(prev => prev.filter(user => user._id !== id))


        } catch (error) {
            console.log(error);

        }

    }
    //set edit user
    function handleEdit(user) {
        setEditUser(user)
    }

    //Handle input change
    function handleEditChange(e) {
        const { name, value } = e.target
        setEditUser(prev => ({ ...prev, [name]: value }))

    }
    //update user
    async function handleUpdate() {
        try {
            const response = await api.put(`/user/edituser/${editUser._id}`,
                editUser,
                { withCredentials: true }
            )
            console.log(response);
            // update UI
            setTabData(prev =>
                prev.map(user =>
                    user._id === editUser._id ? editUser : user
                )   
            )
            setEditUser(null)


            console.log(error);


        } catch (error) {
            console.log(error);

        }

    }

    return (
        <>
            <div className="table-container">

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tabdata.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td  className="action-btn" onClick={() => handleDelete(user._id)} style={{ cursor: 'pointer' }}>🗑️</td>
                                <td  className="action-btn"  onClick={() => handleEdit(user)} style={{ cursor: 'pointer' }}>✏️</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
      {/* ✅ Edit Form */}
      {editUser && (
        <div className='edit-form'>
          <h3>Edit User</h3>

          <input
            type="text"
            name="name"
            value={editUser.name}
            onChange={handleEditChange}
            placeholder="Name"
          />

          <input
            type="email"
            name="email"
            value={editUser.email}
            onChange={handleEditChange}
            placeholder="Email"
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

        
