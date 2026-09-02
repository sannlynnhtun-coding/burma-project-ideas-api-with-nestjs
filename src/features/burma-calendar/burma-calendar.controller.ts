import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CalendarMonthGridDto,
  CalendarReferenceDto,
  CalendarYearDto,
  DateCheckResultDto,
  HolidayDto,
  MonthDto,
} from './burma-calendar';
import { BurmaCalendarService } from './burma-calendar.service';

@ApiTags('burma-calendar | မြန်မာပြက္ခဒိန်')
@Controller('burma-calendar')
export class BurmaCalendarController {
  constructor(private readonly calendarService: BurmaCalendarService) {}

  @Get('months')
  @ApiOperation({
    summary: 'List all Gregorian months with Myanmar month pairs',
    description:
      'Retrieve all 12 Gregorian months with their corresponding traditional Myanmar lunar month pairs and month numbers. ' +
      '<span lang="my">ဂရီဂိုရီယံလ ၁၂ လနှင့် ၎င်းတို့နှင့် ကိုက်ညီသော မြန်မာလတွဲများကို ရယူပါ။</span>',
  })
  @ApiOkResponse({
    type: [MonthDto],
    description: 'Array of 12 months with Myanmar month pair mappings.',
  })
  getMonths(): MonthDto[] {
    return this.calendarService.getMonths();
  }

  @Get('years')
  @ApiOperation({
    summary: 'List available holiday years',
    description:
      'Retrieve the list of years for which official Myanmar public holiday schedules are available. ' +
      '<span lang="my">တရားဝင် မြန်မာ့ရုံးပိတ်ရက်မှတ်တမ်းများ ရရှိနိုင်သော နှစ်များကို ရယူပါ။</span>',
  })
  @ApiOkResponse({
    type: [Number],
    description:
      'Array of supported calendar years (e.g. [2024, 2025, 2026, 2027]).',
  })
  getYears(): number[] {
    return this.calendarService.getAvailableYears();
  }

  @Get('holidays')
  @ApiOperation({
    summary: 'Filter public holidays by year and/or month',
    description:
      'Search and list official Myanmar public holidays across available years. Filter by year (e.g. 2026) and/or month (e.g. "April" or 4). ' +
      '<span lang="my">မြန်မာ့ရုံးပိတ်ရက်များကို နှစ် (ဥပမာ ၂၀၂၆) သို့မဟုတ် လ (ဥပမာ ဧပြီ သို့မဟုတ် ၄) ဖြင့် ရှာဖွေရယူပါ။</span>',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    example: 2026,
    description: 'Calendar year to filter holidays (e.g. 2026).',
  })
  @ApiQuery({
    name: 'month',
    required: false,
    type: String,
    example: 'April',
    description: 'Month name in English (e.g. "April") or month number (1-12).',
  })
  @ApiOkResponse({
    type: [HolidayDto],
    description: 'List of matching public holidays.',
  })
  @ApiNotFoundResponse({
    description: 'The specified year is not found in holiday records.',
  })
  @ApiBadRequestResponse({ description: 'The specified month is invalid.' })
  getHolidays(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ): HolidayDto[] {
    return this.calendarService.getHolidays(year, month);
  }

  @Get('holidays/:year')
  @ApiOperation({
    summary: 'Get all public holidays for a specific year',
    description:
      'Retrieve the complete annual public holiday schedule for a specified year. ' +
      '<span lang="my">သတ်မှတ်ထားသော နှစ်တစ်ခုအတွက် တရားဝင် ရုံးပိတ်ရက်စာရင်း အပြည့်အစုံကို ရယူပါ။</span>',
  })
  @ApiParam({
    name: 'year',
    type: Number,
    example: 2026,
    description: 'Year (e.g. 2024, 2025, 2026, 2027).',
  })
  @ApiOkResponse({
    type: CalendarYearDto,
    description: 'Annual holiday dataset and totals.',
  })
  @ApiNotFoundResponse({ description: 'Year not found in holiday database.' })
  getHolidaysForYear(
    @Param('year', ParseIntPipe) year: number,
  ): CalendarYearDto {
    return this.calendarService.getHolidaysForYear(year);
  }

  @Get('month')
  @ApiOperation({
    summary: 'Generate a 42-day calendar month grid',
    description:
      'Compute a complete 6-week (42-cell) calendar month matrix starting on Sunday with Myanmar Era (မြန်မာသက္ကရာဇ်), traditional month pairs, Myanmar numerals, weekend flags, and public holidays. ' +
      '<span lang="my">တနင်္ဂနွေနေ့မှစသော ၆ ပတ် (၄၂ ကွက်) ပြက္ခဒိန် grid ကို မြန်မာသက္ကရာဇ်၊ လတွဲ၊ မြန်မာဂဏန်း၊ စနေ/တနင်္ဂနွေနှင့် ရုံးပိတ်ရက်များဖြင့် တွက်ချက်ရယူပါ။</span>',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    example: 2026,
    description: 'Calendar year (defaults to current year).',
  })
  @ApiQuery({
    name: 'month',
    required: false,
    type: Number,
    example: 4,
    description: 'Gregorian month number 1-12 (defaults to current month).',
  })
  @ApiOkResponse({
    type: CalendarMonthGridDto,
    description: 'The complete 42-cell month grid and metadata.',
  })
  @ApiBadRequestResponse({ description: 'Month must be between 1 and 12.' })
  getMonthGrid(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ): CalendarMonthGridDto {
    return this.calendarService.getMonthGrid(year, month);
  }

  @Get('reference')
  @ApiOperation({
    summary: 'Get calendar reference metadata and constants',
    description:
      'Retrieve static calendar reference definitions including English months, Myanmar lunar month pairs, bilingual weekday mappings, and numeral conversions. ' +
      '<span lang="my">အင်္ဂလိပ်လများ၊ မြန်မာလတွဲများ၊ နေ့နံအမည်များနှင့် ဂဏန်းပြောင်းလဲမှု အကိုးအကားများကို ရယူပါ။</span>',
  })
  @ApiOkResponse({
    type: CalendarReferenceDto,
    description: 'Calendar reference constants and dictionaries.',
  })
  getReference(): CalendarReferenceDto {
    return this.calendarService.getReferenceData();
  }

  @Get('check-date')
  @ApiOperation({
    summary: 'Check holiday status and details for a single date',
    description:
      'Query a specific date (YYYY-MM-DD) to receive its weekday, Myanmar numeral representation, Myanmar Era year, weekend status, and public holiday details. ' +
      '<span lang="my">ရက်စွဲတစ်ခု (YYYY-MM-DD) ၏ နေ့နံ၊ မြန်မာဂဏန်း၊ မြန်မာသက္ကရာဇ်နှင့် ရုံးပိတ်ရက်ဟုတ်မဟုတ် စစ်ဆေးရယူပါ။</span>',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    type: String,
    example: '2027-01-04',
    description: 'ISO format date (YYYY-MM-DD).',
  })
  @ApiOkResponse({
    type: DateCheckResultDto,
    description: 'Date analysis with holiday information.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid date format or out-of-range date.',
  })
  checkDate(@Query('date') date: string): DateCheckResultDto {
    return this.calendarService.checkDate(date);
  }
}
