import Script from 'next/script';
import Settings from '../../infra/core/settings';

const Analytics = () => (
  <>
    <Script
      id="SrcAnalytic"
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${Settings.getGoogleTagKey()}`}
    />
    <Script
      id="ImpAnalytic"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${Settings.getGoogleTagKey()}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
  </>
);

export default Analytics;
