import { useContext } from "react";
import AuthContext from "../contexts/Auth/context";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useLayout must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;
