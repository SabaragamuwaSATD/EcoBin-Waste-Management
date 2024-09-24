import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode<{
          firstName: string;
          lastName: string;
          phone: string;
          email: string;
        }>(token);
        console.log(decodedToken);
        const user = {
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          phone: decodedToken.phone,
          email: decodedToken.email,
          token,
        };
        setUser(user);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
