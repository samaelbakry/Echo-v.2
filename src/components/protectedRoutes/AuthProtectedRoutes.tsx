import { tokenContext } from "@/context/TokenContextProvider";
import { useUserDataQuery } from "@/hooks/useUserDataQuery/useUserDataQuery";
import getDaysLeft from "@/lib/getDaysLeft";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(tokenContext);
  const { userData, isLoading } = useUserDataQuery();

  if (isLoading) return null; 

  if (isLoggedIn) {
    if (userData?.createdAt) {
      const daysLeft = getDaysLeft(userData.createdAt);

      if (daysLeft <= 0) {
        return <Navigate to="/warning" replace />;
      }
    }

    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AuthProtectedRoutes