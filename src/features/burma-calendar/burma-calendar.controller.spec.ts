import { Test, TestingModule } from '@nestjs/testing';
import { BurmaCalendarController } from './burma-calendar.controller';
import { BurmaCalendarService } from './burma-calendar.service';

describe('BurmaCalendarController', () => {
  let controller: BurmaCalendarController;
  let service: BurmaCalendarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BurmaCalendarController],
      providers: [BurmaCalendarService],
    }).compile();

    controller = module.get<BurmaCalendarController>(BurmaCalendarController);
    service = module.get<BurmaCalendarService>(BurmaCalendarService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('getYears should delegate to service.getAvailableYears', () => {
    const years = controller.getYears();
    expect(years).toEqual([2024, 2025, 2026, 2027]);
  });

  it('getHolidays should delegate to service.getHolidays', () => {
    const holidays = controller.getHolidays('2026', 'April');
    expect(holidays.length).toBeGreaterThan(0);
    expect(holidays.every((h) => h.month === 'April')).toBe(true);
  });

  it('getHolidaysForYear should delegate to service.getHolidaysForYear', () => {
    const yearHolidays = controller.getHolidaysForYear(2026);
    expect(yearHolidays.year).toBe(2026);
    expect(yearHolidays.holidays.length).toBeGreaterThan(0);
  });

  it('getMonthGrid should delegate to service.getMonthGrid', () => {
    const grid = controller.getMonthGrid('2026', '4');
    expect(grid.year).toBe(2026);
    expect(grid.month).toBe(4);
    expect(grid.days).toHaveLength(42);
  });

  it('getReference should delegate to service.getReferenceData', () => {
    const ref = controller.getReference();
    expect(ref.englishMonths).toHaveLength(12);
  });

  it('checkDate should delegate to service.checkDate', () => {
    const result = controller.checkDate('2027-01-04');
    expect(result.date).toBe('2027-01-04');
    expect(result.isHoliday).toBe(true);
  });
});
