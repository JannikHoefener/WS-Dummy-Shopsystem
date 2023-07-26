import { createContext, useState } from "react";

type ProviderProps = {
  children?: React.ReactNode;
};

interface ContextProps {
  isLogIn: boolean;
  logIn: (username: string, password: string) => void;
  user: string | null;
  logOut?: () => void;
}

/**
 * Initial values for the context component LoginProvider
 */
const initValues: ContextProps = {
  isLogIn: false,
  logIn: function (username: string, password: string): boolean {
    throw new Error("Function not implemented.");
  },
  user: null,
  logOut: function (): void {
    throw new Error("Function not implemented.");
  },
};

/**
 * context variable with initial values
 */
export const LoginContext = createContext<ContextProps>(initValues);

/**
 * A component provides the Login Context
 * @param props
 * @returns
 */
export const LoginProvider = (props: ProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLogIn, setIsLogIn] = useState(false);

  /**
   * a check function for username and password
   * @param username
   * @param password
   */
  const checkUsernamePassword = (username: string, password: string) => {
    if (
      (username === "admin" && password === "123") ||
      (username === "wader" && password === "123")
    ) {
      setUser(username);
      setIsLogIn(true);
    } else {
      setUser(null);
      setIsLogIn(false);
    }
  };

  const doLogOut = () => {
    window.location.reload();
  };

  return (
    <LoginContext.Provider
      value={{
        isLogIn: isLogIn,
        user: user,
        logIn: checkUsernamePassword,
        logOut: doLogOut,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
