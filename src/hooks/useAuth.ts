import { AuthContext } from "context/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const [user, login, logout, setUser] = useContext(AuthContext);

  return { user, login, logout, setUser };
}
