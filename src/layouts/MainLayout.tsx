import Footer from "@/components/common/Footer"
import Navbar from "@/components/common/Navbar"
import MobileNavbar from "@/components/mobileNavbar/MobileNavbar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return <>
  <Navbar/>
  <Outlet/>
  <MobileNavbar/>
  <Footer/>
 
  </>
}

export default MainLayout
