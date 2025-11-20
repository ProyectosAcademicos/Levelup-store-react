import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Verificación del rol normalizado
  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/home" replace />;
  }

  console.log("ROLE AUTH:", user.rol);
  console.log("allowed:", allowedRoles);

  return children;
};

export default ProtectedRoute;
