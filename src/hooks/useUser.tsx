import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// User Context Setup
interface UserContextProps {
  user: { email: string; role: string } | null; // Updated to store the logged-in user's data
  setUser: (user: { email: string; role: string } | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<{ email: string; role: string } | null>(() =>
    JSON.parse(sessionStorage.getItem("user") || "null")
  );

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    navigate("/home");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
