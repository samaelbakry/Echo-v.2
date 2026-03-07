import { tokenContext } from "@/context/TokenContextProvider";
import { Radio } from "lucide-react";
import { useContext } from "react";
import { BsDoorOpenFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {setIsLoggedIn} = useContext(tokenContext)

  function logOut(){
    localStorage.removeItem("token")
    setIsLoggedIn(false)
  }
  return (
    <>
      <nav className="bg-blue-50/80 shadow">
        <div className="max-w-6xl mx-auto p-2 flex justify-between items-center">
          <Link to={"/"} className="flex items-center gap-2 text-blue-700 hover:text-blue-900 duration-500">
            <Radio className="text-4xl" />
            <h3 className="text-3xl font-bold">ECHO</h3>
          </Link>
          <div className="flex items-center gap-2 text-red-500 text-lg">
            <span className="cursor-pointer font-bold" onClick={logOut}>LOGOUT</span>
            <BsDoorOpenFill  onClick={logOut}/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
