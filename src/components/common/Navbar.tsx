import { tokenContext } from "@/context/TokenContextProvider";
import { useTheme } from "@/hooks/useTheme/UseTheme";
import { Radio } from "lucide-react";
import { useContext } from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setIsLoggedIn } = useContext(tokenContext);
  const { theme, toggleTheme } = useTheme();

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <>
      <nav className="bg-blue-50/80 shadow dark:bg-slate-900 dark:shadow-slate-700">
        <div className="max-w-6xl mx-auto p-2 flex justify-between items-center">
          <Link
            to={"/"}
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>

            <h3 className="text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">ECHO</h3>
          </Link>
          <div className="flex items-center gap-3 text-red-500 text-lg">
            <button className="bg-slate-200 size-8 dark:bg-slate-800 cursor-pointer rounded-full" onClick={toggleTheme}>
              <span className="text-xl">{theme === "light" ? "🌙" : "☀️"}</span>
            </button>
            <span className="cursor-pointer font-bold" onClick={logOut}>
              LOGOUT
            </span>
            <BsDoorOpenFill onClick={logOut} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
