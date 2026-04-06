import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from './App'
import Records from './Records'
import OutletComponent from "./OutletComponent"
import Login from './Login'
import ProductForm from './ProductForm'
import ShowProducts from './ShowProducts'
import SingleProduct from './SingleProduct'
import ProtectedRoute from './ProtectedRoute'
import Logout from './Logout'
import Cart from './Cart'
import { CartProvider } from './CartContext'
import { AuthProvider } from './AuthContext'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'

const navigator = createBrowserRouter([
    {
        path: "/",
        element: <OutletComponent />,
        children: [{
            index: true,
            element: <App />
        },
        {
            path: "records",
            element:
                <ProtectedRoute>
                    <Records />
                </ProtectedRoute>
        },
        {
            path: "login",
            element:

                <Login />

        },
        {
            path: "addproduct",
            element:
                <ProtectedRoute>
                    <ProductForm />
                </ProtectedRoute>
        },
        {
            path: "showproducts",
            element: <ShowProducts />
        },
        {
            path: "singleproduct/:id",
            element: <SingleProduct />
        },
        {
            path: "logout",
            element: <Logout />
        },
        {
            path: "cart",
            element:

                <ProtectedRoute>
                    <Cart />
                </ProtectedRoute>
        },
        {
            path: "forgot-password",
            element:
                <ForgotPassword />
        },
        {
            path: "reset-password/:token",
            element: <ResetPassword />
        }

        ]

    }
])

export default function Routing() {
    return (
        <>
            <AuthProvider>
                <CartProvider>
                    <RouterProvider router={navigator}></RouterProvider>
                </CartProvider>
            </AuthProvider>
        </>
    )
}
