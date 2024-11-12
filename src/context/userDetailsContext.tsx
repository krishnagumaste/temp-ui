import React, { createContext, useState, ReactNode } from 'react';

interface User {
  token: string;
  firstname?: string;
  lastname?: string;
  email_id?: string;
  [key: string]: unknown;
}

export const UserContext = createContext<{
  user: User | null;
  updateUser: (newUser: User | null) => void;
}>({
  user: null,
  updateUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
