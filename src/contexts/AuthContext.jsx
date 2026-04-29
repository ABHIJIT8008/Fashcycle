import React, { createContext, useContext, useState } from 'react';

// ── Change this to set the admin password ──
const ADMIN_PASSWORD = 'fashcycle@admin2024';
const SESSION_KEY = 'fashcycle_admin_session';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? { email: saved } : null;
  });

  function login(email, password) {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(SESSION_KEY, email || 'admin');
      setCurrentUser({ email: email || 'admin' });
      return Promise.resolve();
    }
    return Promise.reject(new Error('Invalid password'));
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
    return Promise.resolve();
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
