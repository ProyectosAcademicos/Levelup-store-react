import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (userData) => {
  const normalized = {
    token: userData.token,
    rol: userData.usuario.rol,   
    usuario: userData.usuario,
  };

  setUser(normalized);
  localStorage.setItem("user", JSON.stringify(normalized));
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


// ✅ Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);

