import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { ScreenProvider } from '../providers/screen';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ScreenProvider>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </ScreenProvider>
    </AuthProvider>
  );
}

export default MyApp;
