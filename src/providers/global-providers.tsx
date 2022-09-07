import { FC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CartProvider } from './cart';
import { ScreenProvider } from './screen';
import { AuthProvider } from '../contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const theme = extendTheme();

export const GlobalProviders: FC = ({ children }) => (
  <GoogleOAuthProvider clientId="361482313810-2a4akliq009mtcrvtff5qhop5lfg357k.apps.googleusercontent.com">
    <AuthProvider>
      <ScreenProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CartProvider>
      </ScreenProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);
