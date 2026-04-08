import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../axios'

export default function ProtectedRoute({ children }) {


    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => { checkForLogin() },
        [])

    async function checkForLogin() {
        try {
            const response = await api.get("/user/checklogin",
                { withCredentials: true }
            )
            console.log(response);


            if (response.status === 200) {
                setLoggedIn(true)
            }

        } catch (error) {
            setLoggedIn(false)

        }
        finally {
            setLoading(false)
        }
    }
    if (loading) return <h2>Loading...</h2>

    if (!loggedIn) return <Navigate to="/login" />

    return children
}   
