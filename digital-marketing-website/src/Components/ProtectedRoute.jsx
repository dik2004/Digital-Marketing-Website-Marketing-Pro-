import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const user = JSON.parse(userStr);

    // If roles are specified, check if user has required role (or userType)
    if (allowedRoles) {
        const hasPermission = allowedRoles.includes(user.userType) || allowedRoles.includes(user.role);
        if (!hasPermission) {
            // Redirect to home if authorized but wrong role
            return <Navigate to="/" replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
