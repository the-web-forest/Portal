import { FC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CartProvider } from './cart';
import { ScreenProvider } from './screen';
import { AuthProvider } from '../contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Settings from '../infra/core/settings';
import { useConfig } from './config';

const theme = extendTheme();

export const GlobalProviders: FC = ({ children }) => {
  const config = useConfig();
  return (
    <GoogleOAuthProvider clientId={config.values.googleClientId}>
      <AuthProvider>
        <ScreenProvider>
          <CartProvider>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </CartProvider>
        </ScreenProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};
