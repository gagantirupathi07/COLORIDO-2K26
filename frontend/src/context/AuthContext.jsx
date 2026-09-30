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
    const savedUser = sessionStorage.getItem(USER_KEY);

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      sessionStorage.removeItem(USER_KEY);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

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

    sessionStorage.setItem(
      TOKEN_KEY,
      authData.token
    );

    sessionStorage.setItem(
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
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
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

    sessionStorage.setItem(
      USER_KEY,
      JSON.stringify(userData)
    );

    return userData;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = sessionStorage.getItem(TOKEN_KEY);

      if (
        !token ||
        token === "undefined" ||
        token === "null"
      ) {
        setLoading(false);
        return;
      }

      try {
        await refreshUser();
      } catch {
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(USER_KEY);
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