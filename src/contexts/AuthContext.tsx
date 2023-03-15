import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, FC, useCallback, useEffect, useState } from 'react';
import CookiesEnum from '../infra/core/CookiesEnum';
import UserEntity from '../infra/entities/UserEntity';
import LoginUserUseCase from '../infra/useCases/loginUser.usecase';
import ILoginData from '../validations/DTO/ILoginData';
import Router from 'next/router';
import pagePaths from '../infra/core/pagePaths';
import GoogleLoginUserUseCase from '../infra/useCases/googleLoginUser.usecase';
import GoogleAnalytics from '../lib/analytics/GoogleAnalytics';
import ANALYTICS_EVENTS from '../lib/analytics/AnalyticsEvents';

type AuthcontextType = {
  isAuthenticated: boolean | undefined;
  user: UserEntity | null;
  signIn: (data: ILoginData) => Promise<void>;
  googleSignIn: (googleToken: string) => Promise<void>;
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
    setCookie(undefined, CookiesEnum.USER_DATA, JSON.stringify(user), {
      maxAge: 60 * 60 * 1,
    });

    GoogleAnalytics.sendEvent(ANALYTICS_EVENTS.USER_SIGN_IN);

    setUser(user);
    Router.push(pagePaths.nursery.index);
  }, []);

  const googleSignIn = useCallback(async (googleToken: string) => {
    const { accessToken, user } = await new GoogleLoginUserUseCase().run(
      googleToken,
    );
    setCookie(undefined, CookiesEnum.USER_TOKEN, accessToken, {
      maxAge: 60 * 60 * 1,
    });
    setCookie(undefined, CookiesEnum.USER_DATA, JSON.stringify(user), {
      maxAge: 60 * 60 * 1,
    });

    GoogleAnalytics.sendEvent(ANALYTICS_EVENTS.USER_GOOGLE_SIGN_IN);

    setUser(user);
    Router.push(pagePaths.nursery.index);
  }, []);

  const signOut = useCallback(() => {
    GoogleAnalytics.sendEvent(ANALYTICS_EVENTS.USER_SIGN_OUT);
    destroyCookie(undefined, CookiesEnum.USER_TOKEN);
    destroyCookie(undefined, CookiesEnum.USER_DATA);
    Router.push(pagePaths.index).then(() => Router.reload());
  }, []);

  useEffect(() => {
    const { [CookiesEnum.USER_DATA]: userData } = parseCookies();
    if (userData) {
      try {
        setUser(JSON.parse(userData) as UserEntity);
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, googleSignIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
