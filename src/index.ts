import { Calendar } from './Calendar';

declare global {
  interface Window {
    Calendar: typeof Calendar;
  }
}

window.Calendar = Calendar;
