import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  let { isLoggedIn } = useSelector((state) => state.auth);
  let location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

export default RequireAuth;
