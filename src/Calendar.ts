const SECOND_IN_MILLISECONDS = 1000;
const MINUTE_IN_MILLISECONDS = 60 * SECOND_IN_MILLISECONDS;
const HOUR_IN_MILLISECONDS = 60 * MINUTE_IN_MILLISECONDS;
const DAY_IN_MILLISECONDS = 24 * HOUR_IN_MILLISECONDS;
const WEEK_IN_MILLISECONDS = 7 * HOUR_IN_MILLISECONDS;

export class Calendar {
  private date: Date;

  static MONTH_NAMES = [
    'Zéro',
    'Uno',
    'Duo',
    'Tré',
    'Quat',
    'Pent',
    'Céza',
    'Seto',
    'Éiga',
    'Nüna',
    'Deci',
    'Onzo',
    'Béza',
    'Festa',
  ];

  static MONTHS_IN_YEAR = Calendar.MONTH_NAMES.length;
  static DAYS_IN_WEEK = 7;
  static DAYS_IN_MONTH_STANDARD = 4 * Calendar.DAYS_IN_WEEK;
  static DAYS_IN_YEAR_STANDARD = Calendar.DAYS_IN_MONTH_STANDARD * 13 + 1;
  static DAYS_IN_YEAR_LEAP = Calendar.DAYS_IN_YEAR_STANDARD + 1;
  static MILLISECONDS_IN_MONTH_STANDARD = Calendar.DAYS_IN_MONTH_STANDARD * DAY_IN_MILLISECONDS;

  static fromDate(date: Date): Calendar {
    return new Calendar(new Date(date));
  }

  static get now(): Calendar {
    return new Calendar(new Date());
  }

  private constructor(date: Date) {
    // Remove daylight savings time
    const standardTimezoneOffsetInMinutes = getStandardTimezoneOffsetInMinutes(date);
    if (date.getTimezoneOffset() < standardTimezoneOffsetInMinutes) {
      date.setMinutes(date.getMinutes() - standardTimezoneOffsetInMinutes);
    }
    this.date = date;
  }

  get year(): number {
    return this.date.getFullYear();
  }

  get month(): number {
    return Math.floor(this.dayOfYear / Calendar.DAYS_IN_MONTH_STANDARD);
  }

  get monthName(): string {
    return Calendar.MONTH_NAMES[this.month];
  }

  get week(): number {
    return Math.floor(this.dayOfYear / Calendar.DAYS_IN_WEEK);
  }

  get percentOfYearComplete(): number {
    return (
      (this.millisecondsSinceEpoch - this.millisecondsAtYearStart) /
      (this.millisecondsAtYearEnd - this.millisecondsAtYearStart)
    );
  }

  get percentOfMonthComplete(): number {
    return (
      (this.millisecondsSinceEpoch - this.millisecondsAtMonthStart) /
      (this.millisecondsAtMonthEnd - this.millisecondsAtMonthStart)
    );
  }

  get percentOfWeekComplete(): number {
    return (
      (this.millisecondsSinceEpoch - this.millisecondsAtWeekStart) /
      (this.millisecondsAtWeekEnd - this.millisecondsAtWeekStart)
    );
  }

  get percentOfDayComplete(): number {
    return (
      (this.millisecondsSinceEpoch - this.millisecondsAtDayStart) /
      (this.millisecondsAtDayEnd - this.millisecondsAtDayStart)
    );
  }

  get percentOfHourComplete(): number {
    return (
      (this.millisecondsSinceEpoch - this.millisecondsAtHourStart) /
      (this.millisecondsAtHourEnd - this.millisecondsAtHourStart)
    );
  }

  get percentOfMinuteComplete(): number {
    return (
      (this.millisecondsSinceEpoch - this.millisecondsAtMinuteStart) /
      (this.millisecondsAtMinuteEnd - this.millisecondsAtMinuteStart)
    );
  }

  get percentOfSecondComplete(): number {
    return (
      (this.millisecondsSinceEpoch - this.millisecondsAtSecondStart) /
      (this.millisecondsAtSecondEnd - this.millisecondsAtSecondStart)
    );
  }

  get dayOfYear(): number {
    return Math.floor((this.millisecondsSinceEpoch - this.millisecondsAtYearStart) / DAY_IN_MILLISECONDS);
  }

  get dayOfMonth(): number {
    return this.dayOfYear - this.dayOfYearAtMonthStart;
  }

  get dayOfWeek(): number {
    return this.date.getDay();
  }

  get hour(): number {
    return this.date.getHours();
  }

  get minute(): number {
    return this.date.getMinutes();
  }

  get second(): number {
    return this.date.getSeconds();
  }

  get millisecond(): number {
    return this.date.getMilliseconds();
  }

  get millisecondsSinceEpoch(): number {
    return this.date.getTime();
  }

  get millisecondsAtYearStart(): number {
    return new Date(this.date.getFullYear(), 0, 1, 0, 0, 0, 0).getTime();
  }

  get millisecondsAtYearEnd(): number {
    return new Date(this.date.getFullYear() + 1, 0, 1, 0, 0, 0, -1).getTime();
  }

  get millisecondsAtMonthStart(): number {
    return this.millisecondsAtYearStart + this.month * Calendar.MILLISECONDS_IN_MONTH_STANDARD;
  }

  get millisecondsAtMonthEnd(): number {
    return Math.min(
      this.millisecondsAtYearStart + (this.month + 1) * Calendar.MILLISECONDS_IN_MONTH_STANDARD,
      this.millisecondsAtYearEnd,
    );
  }

  get millisecondsAtWeekStart(): number {
    return this.millisecondsAtYearStart + this.week * WEEK_IN_MILLISECONDS;
  }

  get millisecondsAtWeekEnd(): number {
    return Math.min(
      this.millisecondsAtYearStart + (this.week + 1) * Calendar.MILLISECONDS_IN_MONTH_STANDARD,
      this.millisecondsAtYearEnd,
    );
  }

  get millisecondsAtDayStart(): number {
    return new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0, 0).getTime();
  }

  get millisecondsAtDayEnd(): number {
    return new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() + 1, 0, 0, 0, -1).getTime();
  }

  get millisecondsAtHourStart(): number {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.date.getHours(),
      0,
      0,
      0,
    ).getTime();
  }

  get millisecondsAtHourEnd(): number {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.date.getHours() + 1,
      0,
      0,
      -1,
    ).getTime();
  }

  get millisecondsAtMinuteStart(): number {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.date.getHours(),
      this.date.getMinutes(),
      0,
      0,
    ).getTime();
  }

  get millisecondsAtMinuteEnd(): number {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.date.getHours(),
      this.date.getMinutes() + 1,
      0,
      -1,
    ).getTime();
  }

  get millisecondsAtSecondStart(): number {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds(),
      0,
    ).getTime();
  }

  get millisecondsAtSecondEnd(): number {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds() + 1,
      -1,
    ).getTime();
  }

  get dayOfYearAtMonthStart(): number {
    return this.month * Calendar.DAYS_IN_MONTH_STANDARD;
  }

  get dayOfYearAtMonthEnd(): number {
    return Math.min((this.month + 1) * Calendar.DAYS_IN_MONTH_STANDARD - 1, this.daysInYear);
  }

  get daysInYear(): number {
    return this.isLeapYear ? Calendar.DAYS_IN_YEAR_LEAP : Calendar.DAYS_IN_YEAR_STANDARD;
  }

  get isLeapYear(): boolean {
    return this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0);
  }

  toString(): string {
    return `${this.year} ${Calendar.MONTH_NAMES[this.month]} ${this.dayOfMonth} ${String(this.hour).padStart(
      2,
      '0',
    )}:${String(this.minute).padStart(2, '0')}:${String(this.second).padStart(2, '0')}.${String(
      this.millisecond,
    ).padStart(3, '0')}`;
  }
}

function getStandardTimezoneOffsetInMinutes(date: Date): number {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  return jan.getTimezoneOffset() - jul.getTimezoneOffset();
}
