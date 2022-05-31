import type { AppProps } from 'next/app';
import { ScreenProvider } from '../providers/screen';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ScreenProvider>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </ScreenProvider>
  );
}

export default MyApp;
