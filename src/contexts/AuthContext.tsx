import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, FC, useCallback, useState } from 'react';
import CookiesEnum from '../infra/core/CookiesEnum';
import UserEntity from '../infra/entities/UserEntity';
import LoginUserUseCase from '../infra/useCases/loginUser.usecase';
import ILoginData from '../validations/DTO/ILoginData';
import Router from 'next/router';
import pagePaths from '../infra/core/pagePaths';

type AuthcontextType = {
  isAuthenticated: boolean | undefined;
  user: UserEntity | null;
  signIn: (data: ILoginData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthcontextType);

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserEntity | null>(null);
  const isAuthenticated = !!parseCookies()[CookiesEnum.USER_TOKEN];
  const signIn = useCallback(async (data: ILoginData) => {
    const { accessToken, user } = await new LoginUserUseCase().run(data);
    setCookie(undefined, CookiesEnum.USER_TOKEN, accessToken, {
      maxAge: 60 * 60 * 1,
    });
    setUser(user);
    Router.push(pagePaths.dashboard);
  }, []);

  const signOut = useCallback(() => {
    destroyCookie(undefined, CookiesEnum.USER_TOKEN);
    Router.push(pagePaths.index);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
