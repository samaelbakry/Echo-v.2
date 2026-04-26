import { NavLink } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";

export default function MobileNavbar() {
  return <>
        <nav className="bg-blur my-1.5 p-1 dark:bg-slate-600 fixed bottom-0 left-0 w-full lg:hidden text-gray-600 dark:text-white/90 duration-500 transition-all flex items-center justify-evenly">
        <NavLink to={"/home"} className="text-xl"><FaHome/></NavLink>
        <NavLink to={"/userProfile"} className="text-xl"><FaUserCircle /></NavLink>
        <NavLink to={"/notificationsPage"} className="text-xl"><MdNotificationsActive /></NavLink>
        <NavLink to={"/bookmarkedPosts"} className="text-xl"><FaBookmark /></NavLink>
        </nav>
  </>
}
