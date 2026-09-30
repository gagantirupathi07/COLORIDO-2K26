import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminProtectedRoute({ children }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="admin-auth-loading">
        <div className="admin-auth-spinner" />
        <p>Checking administrator access...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminProtectedRoute;