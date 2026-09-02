import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class HolidayDto {
  @ApiProperty({ example: 'April', description: 'Gregorian month name' })
  month: string;

  @ApiProperty({
    example: 'မဟာသင်္ကြန် ရုံးပိတ်ရက်များ',
    description: 'Myanmar holiday name',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Maha Thingyan Holidays',
    description: 'English holiday name',
  })
  nameEn?: string;

  @ApiProperty({
    example: ['13', '14', '15', '16', '17'],
    description: 'Dates in the month (day numbers as strings)',
    type: [String],
  })
  dates: string[];

  @ApiProperty({ example: 5, description: 'Total number of days' })
  total_days: number;

  @ApiPropertyOptional({
    example: 'Public Holiday',
    description: 'Holiday type/classification',
  })
  type?: string;
}

export class CalendarYearDto {
  @ApiProperty({ example: 2026, description: 'Calendar year' })
  year: number;

  @ApiProperty({
    example: 13,
    description: 'Total distinct holidays in the year',
  })
  totalHolidays: number;

  @ApiProperty({
    example: 42,
    description: 'Total holiday days count in the year',
  })
  totalHolidayDays: number;

  @ApiProperty({
    type: [HolidayDto],
    description: 'List of holidays in the year',
  })
  holidays: HolidayDto[];
}

export class WeekdayDto {
  @ApiProperty({ example: 'SUN', description: 'Short weekday abbreviation' })
  short: string;

  @ApiProperty({ example: 'Sunday', description: 'Full English weekday name' })
  english: string;

  @ApiProperty({ example: 'တနင်္ဂနွေ', description: 'Myanmar weekday name' })
  myanmar: string;

  @ApiProperty({
    example: 0,
    description: 'Day of week index (0 for Sunday, 6 for Saturday)',
  })
  index: number;
}

export class CalendarDayCellDto {
  @ApiProperty({ example: 13, description: 'Day number in the cell' })
  day: number;

  @ApiProperty({
    example: '2026-04-13',
    description: 'ISO date string (YYYY-MM-DD)',
  })
  date: string;

  @ApiProperty({
    example: '၁၃',
    description: 'Myanmar numerals for the day number',
  })
  dayMyanmar: string;

  @ApiProperty({
    example: true,
    description: 'Whether this day belongs to the requested month',
  })
  isCurrentMonth: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether this day falls on Saturday or Sunday',
  })
  isWeekend: boolean;

  @ApiProperty({ type: WeekdayDto, description: 'Weekday information' })
  weekday: WeekdayDto;

  @ApiProperty({
    example: true,
    description: 'Whether this day is a recognized Myanmar public holiday',
  })
  isHoliday: boolean;

  @ApiPropertyOptional({
    example: 'မဟာသင်္ကြန် ရုံးပိတ်ရက်များ',
    description: 'Myanmar holiday name if applicable',
  })
  holidayName?: string;

  @ApiPropertyOptional({
    example: 'Maha Thingyan (A-Kyo Day)',
    description: 'English holiday name if applicable',
  })
  holidayNameEn?: string;

  @ApiPropertyOptional({
    example: 'Public Holiday',
    description: 'Holiday classification type',
  })
  holidayType?: string;
}

export class CalendarMonthGridDto {
  @ApiProperty({ example: 2026, description: 'Calendar year' })
  year: number;

  @ApiProperty({ example: 4, description: 'Gregorian month number (1-12)' })
  month: number;

  @ApiProperty({ example: 'April', description: 'English month name' })
  monthName: string;

  @ApiProperty({
    example: 'တန်ခူး / ကဆုန်',
    description: 'Traditional Myanmar lunar month pair',
  })
  myanmarMonthPair: string;

  @ApiProperty({
    example: '၁၃၈၇ / ၁၃၈၈',
    description: 'Myanmar Era (မြန်မာသက္ကရာဇ်) year representation',
  })
  myanmarEra: string;

  @ApiProperty({ example: 30, description: 'Total days in this month' })
  totalDaysInMonth: number;

  @ApiProperty({
    type: [HolidayDto],
    description: 'Holidays occurring in this month',
  })
  holidays: HolidayDto[];

  @ApiProperty({
    type: [CalendarDayCellDto],
    description:
      '42-cell calendar grid array covering 6 weeks starting on Sunday',
  })
  days: CalendarDayCellDto[];
}

export class MonthDto {
  @ApiProperty({ example: 1, description: 'Gregorian month number (1–12)' })
  number: number;

  @ApiProperty({ example: 'January', description: 'English month name' })
  name: string;

  @ApiProperty({
    example: 'နတ်တော် / ပြာသို',
    description: 'Traditional Myanmar lunar month pair',
  })
  myanmarMonthPair: string;
}

export class CalendarReferenceDto {
  @ApiProperty({
    example: [
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
    ],
    description: 'List of English months',
  })
  englishMonths: string[];

  @ApiProperty({
    example: [
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
    ],
    description: 'List of traditional Myanmar lunar month pairs',
  })
  myanmarMonthPairs: string[];

  @ApiProperty({
    type: [WeekdayDto],
    description: 'Weekday reference metadata',
  })
  weekdays: WeekdayDto[];

  @ApiProperty({
    example: {
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
    },
    description: 'Digit-to-Myanmar-numeral dictionary',
  })
  myanmarDigits: Record<string, string>;
}

export class HolidaySimpleDto {
  @ApiProperty({
    example: 'လွတ်လပ်ရေးနေ့',
    description: 'Myanmar holiday name',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Independence Day',
    description: 'English holiday name',
  })
  nameEn?: string;

  @ApiPropertyOptional({
    example: 'Public Holiday',
    description: 'Holiday type classification',
  })
  type?: string;
}

export class DateCheckResultDto {
  @ApiProperty({
    example: '2027-01-04',
    description: 'Queried ISO date string (YYYY-MM-DD)',
  })
  date: string;

  @ApiProperty({ example: 2027, description: 'Year' })
  year: number;

  @ApiProperty({ example: 1, description: 'Month number (1-12)' })
  month: number;

  @ApiProperty({ example: 'January', description: 'Month name' })
  monthName: string;

  @ApiProperty({ example: 4, description: 'Day number' })
  day: number;

  @ApiProperty({ example: '၄', description: 'Myanmar numeral for day' })
  dayMyanmar: string;

  @ApiProperty({
    example: '၁၃၈၈',
    description: 'Myanmar Era year representation',
  })
  myanmarEra: string;

  @ApiProperty({
    example: 'နတ်တော် / ပြာသို',
    description: 'Myanmar lunar month pair',
  })
  myanmarMonthPair: string;

  @ApiProperty({ type: WeekdayDto, description: 'Weekday information' })
  weekday: WeekdayDto;

  @ApiProperty({
    example: false,
    description: 'Whether the date is Saturday or Sunday',
  })
  isWeekend: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the date is a recognized public holiday',
  })
  isHoliday: boolean;

  @ApiPropertyOptional({
    type: HolidaySimpleDto,
    description: 'Holiday details if the date is a holiday',
  })
  holiday?: HolidaySimpleDto | null;
}
