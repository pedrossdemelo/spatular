import AsyncStorage from "@react-native-async-storage/async-storage";
import useLocalStorage from "hooks/useLocalStorage";
import React, { createContext, useMemo } from "react";

type MaybeUser = null | { email: string };

export type AuthContextValue = readonly [
  MaybeUser,
  (email: string) => void,
  () => void,
  React.Dispatch<React.SetStateAction<MaybeUser>>,
];

export const AuthContext = createContext<AuthContextValue>([] as any);

interface Props {
  children: React.ReactNode;
}

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useLocalStorage<MaybeUser>("user", null);

  const login = (email: string) => {
    const newUser = { email };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.clear();
  };

  const value = useMemo(() => [user, login, logout, setUser] as const, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
