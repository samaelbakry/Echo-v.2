import { tokenContext } from "@/context/TokenContextProvider";
import { useUserDataQuery } from "@/hooks/useUserDataQuery/useUserDataQuery";
import getDaysLeft from "@/lib/GetDaysLeft";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(tokenContext);
  const {userData} = useUserDataQuery()

  if(isLoggedIn && userData?.createdAt){
    const daysLeft = getDaysLeft( userData?.CreatedAt)
    
    if(daysLeft <= 0) {
       return <Navigate to="/warning" replace />;
    }
     return <Navigate to="/home" replace />;
  }

  return children
};

export default AuthProtectedRoutes;
