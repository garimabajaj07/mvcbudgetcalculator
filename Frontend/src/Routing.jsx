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
            element: <Login />
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
            path:"logout",
            element: <Logout/>
        }

        ]

    }
])

export default function Routing() {
    return (
        <>
            <RouterProvider router={navigator}></RouterProvider>
        </>
    )
}
