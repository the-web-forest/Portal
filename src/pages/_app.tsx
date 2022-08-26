import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import { GlobalProviders } from '../providers/global-providers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <meta
        name="viewport"
        content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
      />

      <GlobalProviders>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </GlobalProviders>
    </>
  );
}
export default MyApp;
