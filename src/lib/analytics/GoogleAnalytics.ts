import Settings from '../../infra/core/settings';

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
  data?: any;
};

export default class GoogleAnalytics {
  public static sendEvent(
    event_name: string,
    custom_data?: { [key: string]: any },
  ): void {
    return window.gtag('event', event_name, {
      app_name: Settings.ANALYTICS_APP_NAME,
      ...custom_data,
    });
  }
}
