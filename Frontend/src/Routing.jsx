import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Records from './Records'
import OutletComponent from "./OutletComponent"
import Login from './Login'
import ShowProducts from './ShowProducts'
import SingleProduct from './SingleProduct'
import ProtectedRoute from './ProtectedRoute'
import Cart from './Cart'
import { CartProvider } from './CartContext'
import { AuthProvider } from './AuthContext'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import AdminLogin from './admin pages/AdminLogin'
import AdminHome from './admin pages/AdminHome'
import { AdminProvider } from './AdminContext'
import ProtectAdmin from './admin pages/ProtectAdmin'
import ProductTable from './admin pages/ProductTable'
import EditProduct from './EditProduct'
import SellerRegister from './seller pages/SellerRegister'
import SellerLogin from './seller pages/SellerLogin'
import { SellerProvider } from './seller pages/SellerContext'
import SellerAddProduct from './seller pages/SellerAddProduct'
import SellerDashboard from './seller pages/SellerDashboard'
import ProtectSeller from './seller pages/ProtectSeller'
import SellerProductList from './seller pages/SellerProductList'
import Register from './Register'

const navigator = createBrowserRouter([
    {
        path: "/",
        element: <OutletComponent />,
        children: [{
            index: true,
            element: <ShowProducts />
        },
        {
            path: "admin/user/records",
            element:
                <ProtectAdmin>
                    <Records />
                </ProtectAdmin>
        },
        {
            path: "user/login",
            element:
                <Login />
        },
       
        {
            path: "user/register",
            element: <Register />
        },
        {
            path: "singleproduct/:id",
            element: <SingleProduct />
        },
        {
            path: "user/cart",
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
        },
        {
            path: "admin/login",
            element:

                <AdminLogin />

        },
        {
            path: "admin/home",
            element:
                <ProtectAdmin>
                    <AdminHome />
                </ProtectAdmin>
        },
        {
            path: "admin/product/records",
            element:
                <ProductTable />
        },
        {
            path: "product/edit/:id",
            element:
                <EditProduct />
        },
        {
            path: "seller/register",
            element:
                <SellerRegister />
        },
        {
            path: "seller/login",
            element:
                <SellerLogin />
        },
        {
            path: "seller/dashboard",
            element:
                <ProtectSeller>
                    <SellerDashboard />
                </ProtectSeller>
        },
        {
            path: "seller/produt/add",
            element:
                <ProtectSeller>
                    <SellerAddProduct />
                </ProtectSeller>
        },
         {
            path: "seller/product/list",
            element:
                <ProtectSeller>
                    <SellerProductList />
                </ProtectSeller>
        },

        ]

    }
])

export default function Routing() {
    return (
        <>
            <SellerProvider>
                <AdminProvider>
                    <AuthProvider>
                        <CartProvider>
                            <RouterProvider router={navigator}></RouterProvider>
                        </CartProvider>
                    </AuthProvider>
                </AdminProvider>
            </SellerProvider>
        </>
    )
}
