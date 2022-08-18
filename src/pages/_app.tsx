import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { ScreenProvider } from '../providers/screen';
import '../styles/globals.scss';

const theme = extendTheme();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ScreenProvider>
        <ChakraProvider theme={theme}>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </ChakraProvider>
      </ScreenProvider>
    </AuthProvider>
  );
}

export default MyApp;
