import { useAuth } from "@/context/authContext";
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { getUser } = useAuth();
  const user = getUser();
  const location = useLocation();

  if(location.pathname === "/"){
    if(user){
      return <Navigate to="/adm" replace/>
    }
    return <>{children}</>;
  }
  
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (location.pathname === "/") {
    return <Navigate to="/adm" replace />;
  }

  return <>{children}</>;
};
