import { FC } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CartProvider } from '../providers/cart';
import { ScreenProvider } from '../providers/screen';
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
