import { useState, type FC, type PropsWithChildren } from "react";
import { AccessType, type User } from "./types";
import AuthContext from "./context";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setAuthUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logoutUser = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
  };

  const authenticateUser = (accessType: AccessType) => {
    console.log(`[DEBUG]`, accessType);
    setAuthUser({
      username: "test",
      firstName: "Test",
      lastName: "Test",
      fullName: "Test Test",
      email: "test@test.com",
      avatar: null,
      accessType: accessType,
    });
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        logoutUser,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
