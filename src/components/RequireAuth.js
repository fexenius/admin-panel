import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.token) {
    // Redirect them to the /login page, but save the current location
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
