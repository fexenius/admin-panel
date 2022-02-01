import React from "react";
import { saveTokens, getAccessToken, deleteTokens } from "./manageTokens";

const AuthContext = React.createContext();

const authProvider = {
  isAuthenticated: false,
  signin(callback) {
    authProvider.isAuthenticated = true;
    callback();
  },
  signout(callback) {
    authProvider.isAuthenticated = false;
    deleteTokens();
    callback();
  },
};

export function AuthProvider({ children }) {
  let [token, setToken] = React.useState();

  let signin = (tokens, callback) => {
    return authProvider.signin(() => {
      saveTokens(tokens);
      setToken(tokens.accessToken);
      callback();
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setToken(null);
      callback();
    });
  };

  const accesToken = getAccessToken();
  if (accesToken && !token) setToken(accesToken);

  let value = { token, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export { authProvider };
