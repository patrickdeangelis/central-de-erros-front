import React, { createContext, useCallback, useContext, useState } from "react";

import api  from "../services/api";
import { isUndefined } from "util";

interface User {
  name: string;
  email: string;
  id: number;
}

interface Token {
    access: string;
    refresh: string;
}

interface AuthContextData {
  user: User;
  token: Token;
  signIn(email: string, password: string): void;
  signOut(): void;
  isAuthenticated(): boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const user = localStorage.getItem("@Logs:user");

    if (user) {
      return JSON.parse(user);
    }

    return {} as User;
  });
  const [token, setToken] = useState<Token>(() => {
      const token = localStorage.getItem('@Logs:token');

      if(token) {
          return JSON.parse(token);
      }

      return {} as Token;
  });

  const signIn = useCallback(async (email: string, password: string) => {
    const { data: tokenData }: {data: Token} =  await api.post("/auth/jwt/create", {
        email,
        password,
    });
  
    const {data: {results}}: {data: {results: Array<User>}} = await api.get('/auth/users/', {
        headers: {
            'Authorization': `JWT ${tokenData.access}`
        }
    })
    localStorage.setItem("@Logs:user", JSON.stringify(results[0]));
    setUser(results[0]);
    localStorage.setItem('@Logs:token', JSON.stringify(tokenData));
    setToken(tokenData);
  }, []);

  const isAuthenticated = useCallback(() => {
    return !isUndefined(token.access) && token.access.length > 0;
  }, [token.access]);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Logs:user");
    localStorage.removeItem("@Logs:token");
    setUser({} as User);
    setToken({} as Token);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, token, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// HOOKS

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}