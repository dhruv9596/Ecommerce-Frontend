import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
const ProtectedRoute = ({ isAuthenticated , children  , isAdmin}) => {
  const { loading, user } = useSelector((state) => state.user);
  if (isAuthenticated === false) {
    return <redirect to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin"){
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
