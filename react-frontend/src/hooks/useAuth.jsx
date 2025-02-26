import { createContext, useContext, useMemo, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in when component mounts
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to validate the token here
      setUser({ token }); // Or set actual user data
    }
  }, []);
  
  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    localStorage.setItem('token', data.token);
    // navigate("/profile");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    // navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};