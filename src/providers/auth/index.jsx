import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/Auth';

const initialContext = {
  isAuth: false,
  userId: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
};

const AuthContext = createContext(initialContext);

const getUserIdFromLocalStorage = () => {
  const userId = window.localStorage.getItem('user_id');
  return userId || null;
};

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(getUserIdFromLocalStorage());

  const navigate = useNavigate();

  const isAuth = !!userId;

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    if (response !== false) {
      setUserId(response.id);
      window.localStorage.setItem('user_id', response.id);
      navigate('/');
    }
  };

  const registerUser = async (username, telefone, email, password) => {
    await authService.register(username, telefone, email, password);
    navigate('/login');
  };

  const logout = () => {
    setUserId(null);
    window.localStorage.removeItem('user_id');
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, userId, login, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
