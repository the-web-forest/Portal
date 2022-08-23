import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { GlobalProviders } from '../providers/global-providers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProviders>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </GlobalProviders>
  );
}

export default MyApp;
