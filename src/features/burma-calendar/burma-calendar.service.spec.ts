import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BurmaCalendarService } from './burma-calendar.service';

describe('BurmaCalendarService', () => {
  let service: BurmaCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BurmaCalendarService],
    }).compile();

    service = module.get<BurmaCalendarService>(BurmaCalendarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('toMyanmarNumerals', () => {
    it('should correctly convert numbers and strings to Myanmar digits', () => {
      expect(service.toMyanmarNumerals(0)).toBe('၀');
      expect(service.toMyanmarNumerals(12345)).toBe('၁၂၃၄၅');
      expect(service.toMyanmarNumerals(67890)).toBe('၆၇၈၉၀');
      expect(service.toMyanmarNumerals('2026-04-17')).toBe('၂၀၂၆-၀၄-၁၇');
    });
  });

  describe('getMyanmarEraLabel', () => {
    it('should format April (month 3 0-indexed) with a dual transition era', () => {
      const aprilDate = new Date(2026, 3, 15);
      expect(service.getMyanmarEraLabel(aprilDate)).toBe('၁၃၈၇ / ၁၃၈၈');
    });

    it('should calculate year - 639 for months before April', () => {
      const janDate = new Date(2026, 0, 1);
      expect(service.getMyanmarEraLabel(janDate)).toBe('၁၃၈၇');
    });

    it('should calculate year - 638 for months after April', () => {
      const mayDate = new Date(2026, 4, 1);
      expect(service.getMyanmarEraLabel(mayDate)).toBe('၁၃၈၈');
    });
  });

  describe('getAvailableYears', () => {
    it('should return available holiday years in ascending order', () => {
      const years = service.getAvailableYears();
      expect(years).toEqual([2024, 2025, 2026, 2027]);
    });
  });

  describe('getHolidays', () => {
    it('should return all holidays across years when no params provided', () => {
      const holidays = service.getHolidays();
      expect(holidays.length).toBeGreaterThan(30);
    });

    it('should filter holidays by year', () => {
      const holidays2026 = service.getHolidays(2026);
      expect(holidays2026.length).toBeGreaterThan(0);
      expect(holidays2026.some((h) => h.name.includes('သင်္ကြန်'))).toBe(true);
    });

    it('should filter holidays by month string', () => {
      const aprilHolidays = service.getHolidays(2026, 'April');
      expect(aprilHolidays.every((h) => h.month === 'April')).toBe(true);
    });

    it('should filter holidays by month number', () => {
      const aprilHolidays = service.getHolidays(2026, 4);
      expect(aprilHolidays.every((h) => h.month === 'April')).toBe(true);
    });

    it('should throw NotFoundException for unsupported year', () => {
      expect(() => service.getHolidays(2099)).toThrow(NotFoundException);
    });

    it('should throw BadRequestException for invalid month', () => {
      expect(() => service.getHolidays(2026, 'InvalidMonth')).toThrow(
        BadRequestException,
      );
      expect(() => service.getHolidays(2026, 13)).toThrow(BadRequestException);
    });
  });

  describe('getHolidaysForYear', () => {
    it('should return annual holiday details with summary counts', () => {
      const result = service.getHolidaysForYear(2027);
      expect(result.year).toBe(2027);
      expect(result.totalHolidays).toBeGreaterThan(0);
      expect(result.totalHolidayDays).toBeGreaterThan(0);
      expect(result.holidays.some((h) => h.name === 'လွတ်လပ်ရေးနေ့')).toBe(
        true,
      );
    });

    it('should throw NotFoundException if year is not available', () => {
      expect(() => service.getHolidaysForYear(1990)).toThrow(NotFoundException);
    });
  });

  describe('getMonthGrid', () => {
    it('should generate a 42-cell grid for April 2026', () => {
      const grid = service.getMonthGrid(2026, 4);
      expect(grid.year).toBe(2026);
      expect(grid.month).toBe(4);
      expect(grid.monthName).toBe('April');
      expect(grid.myanmarMonthPair).toBe('တပေါင်း / တန်ခူး');
      expect(grid.myanmarEra).toBe('၁၃၈၇ / ၁၃၈၈');
      expect(grid.totalDaysInMonth).toBe(30);
      expect(grid.days).toHaveLength(42);

      // Verify a specific day cell in April 2026
      const thingyanAkyo = grid.days.find(
        (d) => d.isCurrentMonth && d.day === 13,
      );
      expect(thingyanAkyo).toBeDefined();
      expect(thingyanAkyo?.isHoliday).toBe(true);
      expect(thingyanAkyo?.holidayName).toContain('သင်္ကြန်');
      expect(thingyanAkyo?.dayMyanmar).toBe('၁၃');
      expect(thingyanAkyo?.weekday.short).toBe('MON');
    });

    it('should throw BadRequestException for invalid month param', () => {
      expect(() => service.getMonthGrid(2026, 0)).toThrow(BadRequestException);
      expect(() => service.getMonthGrid(2026, 13)).toThrow(BadRequestException);
    });
  });

  describe('checkDate', () => {
    it('should accurately identify 2027-01-04 as Independence Day', () => {
      const result = service.checkDate('2027-01-04');
      expect(result.date).toBe('2027-01-04');
      expect(result.year).toBe(2027);
      expect(result.month).toBe(1);
      expect(result.day).toBe(4);
      expect(result.dayMyanmar).toBe('၄');
      expect(result.weekday.short).toBe('MON');
      expect(result.isWeekend).toBe(false);
      expect(result.isHoliday).toBe(true);
      expect(result.holiday?.name).toBe('လွတ်လပ်ရေးနေ့');
      expect(result.holiday?.nameEn).toBe('Independence Day');
    });

    it('should accurately identify a non-holiday date', () => {
      const result = service.checkDate('2027-01-05');
      expect(result.isHoliday).toBe(false);
      expect(result.holiday).toBeNull();
    });

    it('should throw BadRequestException for invalid date format or out-of-range date', () => {
      expect(() => service.checkDate('2027/01/04')).toThrow(
        BadRequestException,
      );
      expect(() => service.checkDate('invalid')).toThrow(BadRequestException);
      expect(() => service.checkDate('2027-02-30')).toThrow(
        BadRequestException,
      );
      expect(() => service.checkDate('2027-13-01')).toThrow(
        BadRequestException,
      );
    });
  });

  describe('getReferenceData', () => {
    it('should return reference lists and mappings', () => {
      const ref = service.getReferenceData();
      expect(ref.englishMonths).toHaveLength(12);
      expect(ref.myanmarMonthPairs).toHaveLength(12);
      expect(ref.weekdays).toHaveLength(7);
      expect(ref.myanmarDigits['5']).toBe('၅');
    });
  });
});
