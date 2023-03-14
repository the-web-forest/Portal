import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { GlobalProviders } from '../providers/global-providers';
import { ConfigurationProvider } from '../providers/config';
import { hotjar } from 'react-hotjar';
import { useEffect } from 'react';
import Analytics from '../components/Analytics';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hotjar.initialize(3218753, 6);
  }, []);

  return (
    <>
      <meta
        name="viewport"
        content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
      />
      <Analytics />
      <ConfigurationProvider>
        <GlobalProviders>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </GlobalProviders>
      </ConfigurationProvider>
    </>
  );
}
export default MyApp;
