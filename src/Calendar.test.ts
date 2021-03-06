import { Calendar } from './Calendar';
import timekeeper from 'timekeeper';

timekeeper.freeze(new Date(2000, 11, 30)); // Last day of 2000

describe('year', () => {
  test("should match the local timezone's year without DST", () => {
    expect(Calendar.now.year).toEqual(2000);
  });
});

describe('day of year', () => {
  test('should be the same as the day of the year for the Gregorian calendar', () => {
    expect(Calendar.now.dayOfYear).toEqual(364);
  });
});

describe('month', () => {
  test('should be floor of the day of the year divided by the number of days in a standard month', () => {
    expect(Calendar.now.month).toEqual(13);
  });
});

describe('week', () => {
  test('should be floor of the day of the year divided by the number of days in a standard week', () => {
    expect(Calendar.now.week).toEqual(52);
  });
});
