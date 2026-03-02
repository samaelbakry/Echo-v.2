import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto my-20 grid grid-cols-1 md:grid-cols-4 bg-auth">
        <div className="col-span-1 md:col-span-2 p-5 bg-blur relative">
          <h1 className="text-violet-900 md:text-4xl font-bold my-5">
            Welcome to ECHO
          </h1>
          <p className="text-gray-500 p-1">
            A refreshed experience built with cleaner design, smoother
            interactions, and powerful new features. ECHO is evolving — bringing
            better performance, modern styles, and a more intuitive way to
            connect and explore.
          </p>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 opacity-20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400 opacity-20 rounded-full blur-3xl"></div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
