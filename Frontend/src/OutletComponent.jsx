import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

export default function OutletComponent() {
  return (
    <div className="app-wrapper">
      
      <Header />

      <div className="main-content">
        <Outlet />
      </div>

      <Footer />

    </div>
  )
}