import { NavLink } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

export default function MobileNavbar() {
  return <>
    <div className="max-w-7xl mx-auto">
        <nav className="bg-blur p-3 dark:bg-slate-600 fixed bottom-0 left-0 w-full lg:hidden text-gray-600 dark:text-white/60 duration-500 flex items-center justify-evenly">
        <NavLink to={"/home"} className="text-xl"><FaHome/></NavLink>
        <NavLink to={"/userProfile"} className="text-xl"><FaUserCircle /></NavLink>
        <NavLink to={"/notificationsPage"} className="text-xl"><MdNotificationsActive /></NavLink>
        <NavLink to={"/bookmarkedPosts"} className="text-xl"><FaBookmark /></NavLink>
        </nav>
    </div>
  </>
}
