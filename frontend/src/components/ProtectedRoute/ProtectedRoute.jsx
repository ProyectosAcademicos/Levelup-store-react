import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/home" replace />;
  }
  

  return children;
};

export default ProtectedRoute;
