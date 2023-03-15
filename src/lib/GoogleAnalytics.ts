import Settings from '../infra/core/settings';

export const pageview = (url: string) => {
  window.gtag('config', Settings.getGoogleTagKey(), {
    page_path: url,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
  data?: any;
};

export const sendGoogleEvent = ({
  action,
  category,
  label,
  value,
  data,
}: GTagEvent): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    data,
  });
};
