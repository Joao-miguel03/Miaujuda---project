import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = (usuarioData) => {
    setUsuario(usuarioData);
  };

  const logout = () => {
    setUsuario(null);
  };

  const isAdmin = usuario?.is_admin || false;

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
