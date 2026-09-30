import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser
} from "../api/authApi";

const AuthContext = createContext(null);

const TOKEN_KEY = "colorido_token";
const USER_KEY = "colorido_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY);

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  };

  const saveAuth = (authData) => {
    if (!authData?.token) {
      throw new Error(
        "Login response does not contain a token"
      );
    }

    const userData = {
      userId: authData.userId,
      fullName: authData.fullName,
      email: authData.email,
      role: authData.role
    };

    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    localStorage.setItem(
      TOKEN_KEY,
      authData.token
    );

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const login = async (email, password) => {
    const response = await loginUser({
      email,
      password
    });

    saveAuth(response);

    return response;
  };

  const logout = () => {
    logoutUser();

    clearAuth();

    setUser(null);
  };

  const refreshUser = async () => {
    const response = await getCurrentUser();

    const userData = {
      userId: response.userId ?? response.id,
      fullName: response.fullName,
      email: response.email,
      role: response.role
    };

    setUser(userData);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(userData)
    );

    return userData;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (
        !token ||
        token === "undefined" ||
        token === "null"
      ) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        await refreshUser();
      } catch {
        clearAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        refreshUser,
        saveAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;