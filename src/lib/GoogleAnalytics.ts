import Settings from '../infra/core/settings';

export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag('config', Settings.getGoogleTagKey(), {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: any) => {
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
