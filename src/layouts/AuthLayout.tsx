import { useTheme } from "@/hooks/useTheme/UseTheme";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const {theme}=useTheme()
  return (
    <div className="min-h-screen bg-blue-100 dark:bg-slate-800 flex items-center">
      <div className={`max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-4 rounded-2xl p-5 ${theme === "dark" ? "dark:bg-slate-700 " : "bg-auth"}`}>
        <div className="col-span-1 md:col-span-2 p-5 bg-blur relative self-start my-5 dark:bg-slate-600">
          <h1 className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent md:text-4xl font-bold my-5">
            Welcome to ECHO
          </h1>
          <p className="text-base font-bold uppercase bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">your digital diary</p>
          <p className="text-gray-500 p-1 dark:text-white/80">
            A refreshed experience built with cleaner design, smoother
            interactions, and powerful new features. ECHO is evolving — bringing
            better performance, modern styles, and a more intuitive way to
            connect and explore.
          </p>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-800 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-400 opacity-20 rounded-full blur-3xl"></div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
