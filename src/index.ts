import { Calendar } from './Calendar';

declare global {
  interface Window {
    Calendar: typeof Calendar;
    syncColorSchemeWithSystemPreferences: () => void;
  }
}

window.Calendar = Calendar;

window.syncColorSchemeWithSystemPreferences = () => {
  document.body.className =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-theme' : '';
};
