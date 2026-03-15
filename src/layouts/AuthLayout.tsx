import { useTheme } from "@/hooks/useTheme/UseTheme";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-blue-100 dark:bg-slate-800 flex items-center">
      <div
        className={`max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-4 rounded-2xl p-5 ${theme === "dark" ? "dark:bg-slate-700 " : "bg-auth"}`}
      >
        <div className="col-span-1 md:col-span-2 p-5 bg-blur relative self-start my-5 dark:bg-slate-600">
          <div className="flex items-center gap-2">
            <h1 className="bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent md:text-4xl font-bold my-5">
              Welcome to ECHO
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="url(#gradient)"
              className="size-10"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <p className="text-base font-bold uppercase bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            your digital diary
          </p>
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
