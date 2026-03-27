import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {

    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => { checkForLogin() },
        [])

    async function checkForLogin() {
        try {
            const response = await axios.get("http://localhost:3000/user/check",
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

    if (!loggedIn) navigate("/login") //false state

    return children
}   
