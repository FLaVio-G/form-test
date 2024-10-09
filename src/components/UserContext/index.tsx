import { createContext, useState, useEffect } from "react";

type User = {
  fullName: string;
  email: string;
  password: string;
};

interface IUserContext {
  user: User;
  updateUser: (updatedData: Partial<User>) => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (data: Partial<User>) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ updateUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
