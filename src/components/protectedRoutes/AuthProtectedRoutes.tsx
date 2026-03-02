import { tokenContext } from "@/context/TokenContextProvider";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(tokenContext);

  return !isLoggedIn ? children : <Navigate to={"/"} />;
};

export default AuthProtectedRoutes;
