import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, getMe, logout, register } from "../services/auth.api";
import { getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    const data = await login({ email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    const data = await register({ username, email, password });
    setUser(user.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    const data = await logout();
    setUser(null);
    setLoading(false);
  };
  return { user, loading, handleLogin, handleLogout, handleRegister };

    
  useEffect(() => {
    const getAndSetUser = async()=>{
      const data = await getMe()
      setUser(data.user)
      setLoading(false) 
    }
  }, [])
};
