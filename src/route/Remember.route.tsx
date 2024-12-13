import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const RememberRoute = () => {
  const { user } = useUser();

  // If there's no user, redirect to the home page
  if (!user) {
    return <Navigate to="/" replace />;
  } else if (user?.Role === "Admin") {
    <Navigate to="/admin" replace />;
  } else if (user?.Role === "User") {
    <Navigate to="/user" replace />;
  } else {
    <Navigate to="/refere" replace />;
  }

  // If there's a user, render the child routes
  return <Outlet />;
};

export default RememberRoute;
