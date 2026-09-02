import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CalendarDayCellDto,
  CalendarMonthGridDto,
  CalendarReferenceDto,
  CalendarYearDto,
  DateCheckResultDto,
  HolidayDto,
  MonthDto,
  WeekdayDto,
} from './burma-calendar';
import holidayDataRaw from './data/holidays.json';
import holidayData2027Raw from './data/holidays-2027.json';

export const ENGLISH_MONTHS: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MYANMAR_MONTH_PAIRS: string[] = [
  'နတ်တော် / ပြာသို',
  'ပြာသို / တပို့တွဲ',
  'တပို့တွဲ / တပေါင်း',
  'တပေါင်း / တန်ခူး',
  'တန်ခူး / ကဆုန်',
  'ကဆုန် / နယုန်',
  'နယုန် / ဝါဆို',
  'ဝါဆို / ဝါခေါင်',
  'ဝါခေါင် / တော်သလင်း',
  'တော်သလင်း / သီတင်းကျွတ်',
  'သီတင်းကျွတ် / တန်ဆောင်မုန်း',
  'တန်ဆောင်မုန်း / နတ်တော်',
];

export const WEEKDAYS: WeekdayDto[] = [
  { short: 'SUN', english: 'Sunday', myanmar: 'တနင်္ဂနွေ', index: 0 },
  { short: 'MON', english: 'Monday', myanmar: 'တနင်္လာ', index: 1 },
  { short: 'TUE', english: 'Tuesday', myanmar: 'အင်္ဂါ', index: 2 },
  { short: 'WED', english: 'Wednesday', myanmar: 'ဗုဒ္ဓဟူး', index: 3 },
  { short: 'THU', english: 'Thursday', myanmar: 'ကြာသပတေး', index: 4 },
  { short: 'FRI', english: 'Friday', myanmar: 'သောကြာ', index: 5 },
  { short: 'SAT', english: 'Saturday', myanmar: 'စနေ', index: 6 },
];

export const MYANMAR_DIGITS: Record<string, string> = {
  '0': '၀',
  '1': '၁',
  '2': '၂',
  '3': '၃',
  '4': '၄',
  '5': '၅',
  '6': '၆',
  '7': '၇',
  '8': '၈',
  '9': '၉',
};

interface RawHoliday2027 {
  date: string;
  month: number;
  day: number;
  name_en: string;
  name_mm: string;
  type: string;
}

interface RawHolidayData {
  years: Record<string, { year: number; holidays: HolidayDto[] }>;
}

@Injectable()
export class BurmaCalendarService {
  private readonly holidaysMap: Record<number, HolidayDto[]> = {};

  constructor() {
    const rawYears = (holidayDataRaw as unknown as RawHolidayData).years;
    for (const [yearStr, yearObj] of Object.entries(rawYears)) {
      const year = parseInt(yearStr, 10);
      this.holidaysMap[year] = yearObj.holidays;
    }

    // Process 2027 holidays
    const raw2027 = holidayData2027Raw as RawHoliday2027[];
    const holidays2027: HolidayDto[] = raw2027.map((h) => {
      const monthName = ENGLISH_MONTHS[h.month - 1] ?? 'Unknown';
      return {
        month: monthName,
        name: h.name_mm,
        nameEn: h.name_en,
        dates: [String(h.day)],
        total_days: 1,
        type: h.type,
      };
    });

    this.holidaysMap[2027] = holidays2027;
  }

  toMyanmarNumerals(value: number | string): string {
    return String(value)
      .split('')
      .map((digit) => MYANMAR_DIGITS[digit] ?? digit)
      .join('');
  }

  getMyanmarEraLabel(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed: 0 = Jan, 3 = Apr

    if (month === 3) {
      return `${this.toMyanmarNumerals(year - 639)} / ${this.toMyanmarNumerals(year - 638)}`;
    }

    return this.toMyanmarNumerals(year - (month < 3 ? 639 : 638));
  }

  getAvailableYears(): number[] {
    return Object.keys(this.holidaysMap)
      .map((year) => parseInt(year, 10))
      .sort((a, b) => a - b);
  }

  parseYear(year?: number | string): number | undefined {
    if (year === undefined || year === null || year === '') {
      return undefined;
    }
    const num = typeof year === 'number' ? year : parseInt(String(year).trim(), 10);
    if (isNaN(num)) {
      throw new BadRequestException(`Invalid year: "${year}"`);
    }
    return num;
  }

  parseMonth(month?: number | string): number | undefined {
    if (month === undefined || month === null || month === '') {
      return undefined;
    }
    if (typeof month === 'number') {
      if (isNaN(month) || month < 1 || month > 12) {
        throw new BadRequestException(
          'Month must be an integer between 1 and 12',
        );
      }
      return Math.floor(month);
    }
    const trimmed = String(month).trim();
    const num = parseInt(trimmed, 10);
    if (!isNaN(num) && String(num) === trimmed) {
      if (num < 1 || num > 12) {
        throw new BadRequestException(
          'Month must be an integer between 1 and 12',
        );
      }
      return num;
    }
    const foundIndex = ENGLISH_MONTHS.findIndex(
      (m) => m.toLowerCase() === trimmed.toLowerCase(),
    );
    if (foundIndex !== -1) {
      return foundIndex + 1;
    }
    throw new BadRequestException(
      `Invalid month: "${month}". Must be 1-12 or a valid month name.`,
    );
  }

  getHolidays(
    year?: number | string,
    month?: number | string,
  ): HolidayDto[] {
    const parsedYear = this.parseYear(year);
    const parsedMonth = this.parseMonth(month);

    let result: HolidayDto[] = [];

    if (parsedYear !== undefined) {
      const yearHolidays = this.holidaysMap[parsedYear];
      if (!yearHolidays) {
        throw new NotFoundException(
          `Holidays for year ${parsedYear} are not available`,
        );
      }
      result = [...yearHolidays];
    } else {
      for (const yearHolidays of Object.values(this.holidaysMap)) {
        result.push(...yearHolidays);
      }
    }

    if (parsedMonth !== undefined) {
      const targetMonth = ENGLISH_MONTHS[parsedMonth - 1];
      result = result.filter(
        (h) => h.month.toLowerCase() === targetMonth.toLowerCase(),
      );
    }

    return result;
  }

  getHolidaysForYear(year: number): CalendarYearDto {
    const yearHolidays = this.holidaysMap[year];
    if (!yearHolidays) {
      throw new NotFoundException(
        `Holidays for year ${year} are not available`,
      );
    }

    const totalHolidayDays = yearHolidays.reduce(
      (sum, h) => sum + (h.total_days || h.dates.length),
      0,
    );

    return {
      year,
      totalHolidays: yearHolidays.length,
      totalHolidayDays,
      holidays: yearHolidays,
    };
  }

  getMonthGrid(
    yearParam?: number | string,
    monthParam?: number | string,
  ): CalendarMonthGridDto {
    const now = new Date();
    const parsedYear = this.parseYear(yearParam);
    const parsedMonth = this.parseMonth(monthParam);

    const year = parsedYear ?? now.getFullYear();
    const month = parsedMonth ?? now.getMonth() + 1; // 1-12

    const monthIndex = month - 1; // 0-11
    const monthName = ENGLISH_MONTHS[monthIndex];
    const myanmarMonthPair = MYANMAR_MONTH_PAIRS[monthIndex];
    const targetDate = new Date(year, monthIndex, 1);
    const myanmarEra = this.getMyanmarEraLabel(targetDate);

    // Days in current month
    const totalDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    // Holidays for this month
    const monthHolidays = (this.holidaysMap[year] ?? []).filter(
      (h) => h.month.toLowerCase() === monthName.toLowerCase(),
    );

    // Determine first day of week for the 1st of month (0 = Sun, 6 = Sat)
    const firstWeekday = new Date(year, monthIndex, 1).getDay();

    // Generate 42 cells (6 rows * 7 columns)
    const days: CalendarDayCellDto[] = Array.from(
      { length: 42 },
      (_, index) => {
        // Calculate date relative to 1st of the month
        const dayOffset = index - firstWeekday + 1;
        const cellDate = new Date(year, monthIndex, dayOffset);
        const isCurrentMonth = cellDate.getMonth() === monthIndex;
        const dayNum = cellDate.getDate();
        const cellWeekday = cellDate.getDay();
        const weekdayInfo = WEEKDAYS[cellWeekday];

        // Format ISO date (YYYY-MM-DD)
        const yyyy = cellDate.getFullYear();
        const mm = String(cellDate.getMonth() + 1).padStart(2, '0');
        const dd = String(dayNum).padStart(2, '0');
        const dateString = `${yyyy}-${mm}-${dd}`;

        // Check holidays for this cell if current month
        let isHoliday = false;
        let holidayName: string | undefined;
        let holidayNameEn: string | undefined;
        let holidayType: string | undefined;

        if (isCurrentMonth) {
          const matching = monthHolidays.filter((h) =>
            h.dates.includes(String(dayNum)),
          );
          if (matching.length > 0) {
            isHoliday = true;
            holidayName = matching.map((h) => h.name).join(' / ');
            const englishNames = matching
              .map((h) => h.nameEn)
              .filter((n): n is string => Boolean(n));
            if (englishNames.length > 0) {
              holidayNameEn = englishNames.join(' / ');
            }
            const types = matching
              .map((h) => h.type)
              .filter((t): t is string => Boolean(t));
            if (types.length > 0) {
              holidayType = types.join(' / ');
            }
          }
        }

        return {
          day: dayNum,
          date: dateString,
          dayMyanmar: this.toMyanmarNumerals(dayNum),
          isCurrentMonth,
          isWeekend: cellWeekday === 0 || cellWeekday === 6,
          weekday: weekdayInfo,
          isHoliday,
          holidayName,
          holidayNameEn,
          holidayType,
        };
      },
    );

    return {
      year,
      month,
      monthName,
      myanmarMonthPair,
      myanmarEra,
      totalDaysInMonth,
      holidays: monthHolidays,
      days,
    };
  }

  checkDate(dateString: string): DateCheckResultDto {
    if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString.trim())) {
      throw new BadRequestException(
        'Date must be in ISO format YYYY-MM-DD (e.g. 2027-01-04)',
      );
    }

    const [yStr, mStr, dStr] = dateString.trim().split('-');
    const year = parseInt(yStr, 10);
    const month = parseInt(mStr, 10);
    const day = parseInt(dStr, 10);

    if (month < 1 || month > 12) {
      throw new BadRequestException('Month in date must be between 1 and 12');
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      throw new BadRequestException(
        `Day in date must be between 1 and ${daysInMonth} for month ${month}`,
      );
    }

    const dateObj = new Date(year, month - 1, day);
    const monthIndex = month - 1;
    const monthName = ENGLISH_MONTHS[monthIndex];
    const myanmarMonthPair = MYANMAR_MONTH_PAIRS[monthIndex];
    const myanmarEra = this.getMyanmarEraLabel(dateObj);
    const weekday = WEEKDAYS[dateObj.getDay()];
    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;

    // Check holiday
    const yearHolidays = this.holidaysMap[year] ?? [];
    const monthHolidays = yearHolidays.filter(
      (h) => h.month.toLowerCase() === monthName.toLowerCase(),
    );
    const matching = monthHolidays.filter((h) => h.dates.includes(String(day)));

    let isHoliday = false;
    let holiday: { name: string; nameEn?: string; type?: string } | null = null;

    if (matching.length > 0) {
      isHoliday = true;
      holiday = {
        name: matching.map((h) => h.name).join(' / '),
        nameEn:
          matching
            .map((h) => h.nameEn)
            .filter(Boolean)
            .join(' / ') || undefined,
        type:
          matching
            .map((h) => h.type)
            .filter(Boolean)
            .join(' / ') || undefined,
      };
    }

    return {
      date: dateString.trim(),
      year,
      month,
      monthName,
      day,
      dayMyanmar: this.toMyanmarNumerals(day),
      myanmarEra,
      myanmarMonthPair,
      weekday,
      isWeekend,
      isHoliday,
      holiday,
    };
  }

  getReferenceData(): CalendarReferenceDto {
    return {
      englishMonths: ENGLISH_MONTHS,
      myanmarMonthPairs: MYANMAR_MONTH_PAIRS,
      weekdays: WEEKDAYS,
      myanmarDigits: MYANMAR_DIGITS,
    };
  }

  getMonths(): MonthDto[] {
    return ENGLISH_MONTHS.map((name, index) => ({
      number: index + 1,
      name,
      myanmarMonthPair: MYANMAR_MONTH_PAIRS[index],
    }));
  }
}
