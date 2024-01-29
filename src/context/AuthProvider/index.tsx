import { createContext, useEffect, useState } from 'react';

import { IAuthProvider, IContext, IUser } from './types';
import {
  getUser,
  getUsersDBLocalStorage,
  getUserTokenLocalStorage,
  removeUserTokenLocalStorage,
  setUserLocalStorage,
} from './utils';

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const userToken = getUserTokenLocalStorage();
    const users = getUsersDBLocalStorage();

    if (userToken?.email && users?.length > 0) {
      const hasUser = users?.filter(
        (user: { email: string }) => user.email === userToken.email,
      );

      if (hasUser) {
        setUser(hasUser[0]);
      }
    }
  }, []);

  async function handleSignin(email: string, password: string) {
    const hasUser = getUser(email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem('ut', JSON.stringify({ email, token }));
        setUser({ email, token });
      } else {
        throw new Error('Opa! E-mail e/ou senha incorretos.');
      }
    } else {
      throw new Error('Usuário ainda não cadastrado.');
    }
  }

  async function handleSignup(email: string, password: string) {
    const hasUser = getUser(email);

    if (hasUser?.length) {
      throw new Error('Opa! Encontramos uma conta com esse E-mail.');
    }

    const user = { email, password };
    setUserLocalStorage(user);
  }

  async function handleLogout() {
    setUser(null);
    removeUserTokenLocalStorage();
  }

  return (
    <AuthContext.Provider
      value={{
        email: user?.email,
        token: user?.token,
        handleLogout,
        handleSignin,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
