import { FC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CartProvider } from './cart';
import { ScreenProvider } from './screen';
import { AuthProvider } from '../contexts/AuthContext';

const theme = extendTheme();

export const GlobalProviders: FC = ({ children }) => (
  <AuthProvider>
    <ScreenProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CartProvider>
    </ScreenProvider>
  </AuthProvider>
);
