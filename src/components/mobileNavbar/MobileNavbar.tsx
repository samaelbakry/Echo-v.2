import { NavLink } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

export default function MobileNavbar() {
  return <>
    <div className="max-w-7xl mx-auto p-2 my-2 ">
        <nav className="bg-blur fixed bottom-0 left-0 w-full p-1 lg:hidden text-gray-600 duration-500 flex items-center justify-evenly">
        <NavLink to={"/home"} className="text-xl"><FaHome/></NavLink>
        <NavLink to={"/userProfile"} className="text-xl"><FaUserCircle /></NavLink>
        <NavLink to={"/notificationspage"} className="text-xl"><MdNotificationsActive /></NavLink>
        <NavLink to={"/bookmarkpage"} className="text-xl"><FaBookmark /></NavLink>
        </nav>
    </div>
  </>
}
