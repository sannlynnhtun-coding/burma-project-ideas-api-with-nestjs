import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  AdhihtanCategory,
  AdhihtanContent,
  AdhihtanScheduleLevel,
  AdhihtanSpell,
} from './adhihtan';
import { AdhihtanService } from './adhihtan.service';

const notFoundDescription =
  'No Adhihtan item matches the supplied ID. Check the ID and try again. ' +
  '<span lang="my">ပေးထားသော ID နှင့်ကိုက်ညီသည့် အဓိဋ္ဌာန်အချက်အလက် မရှိပါ။ ID ကိုစစ်ပြီး ထပ်မံကြိုးစားပါ။</span>';

@ApiTags('Adhihtan')
@Controller('adhihtan')
export class AdhihtanController {
  constructor(private readonly adhihtanService: AdhihtanService) {}

  @Get('data.json')
  @ApiOperation({
    summary: 'Get all Adhihtan data',
    description:
      'Get categories, schedules, and localized spell names in one response. Use this endpoint to cache the full dataset or make it available offline. ' +
      '<span lang="my">အမျိုးအစား၊ schedule နှင့် ဂုဏ်တော်အမည်များကို response တစ်ခုတည်းဖြင့် ရယူပါ။ Data အားလုံးကို cache လုပ်ရန် သို့မဟုတ် offline အသုံးပြုနိုင်ရန် ဒီ endpoint ကိုသုံးပါ။</span>',
  })
  @ApiOkResponse({
    type: AdhihtanContent,
    description:
      'All Adhihtan categories, schedules, source metadata, and localized spell names. ' +
      '<span lang="my">အဓိဋ္ဌာန်အမျိုးအစား၊ schedule၊ source metadata နှင့် ဂုဏ်တော်အမည်များ အားလုံး။</span>',
  })
  getRawData(): AdhihtanContent {
    return this.adhihtanService.getContent();
  }

  @Get('categories')
  @ApiOperation({
    summary: 'List Adhihtan categories',
    description:
      'Get the five practices available in Adhihtan. Each category includes its duration, format, benefit summary, level options, and guidance. ' +
      '<span lang="my">Adhihtan တွင်ရှိသော အဓိဋ္ဌာန်အမျိုးအစား ငါးမျိုးကို ရယူပါ။ အမျိုးအစားတစ်ခုစီတွင် ကြာချိန်၊ ပုံစံ၊ အကျိုးအနှစ်ချုပ်၊ အဆင့်ရွေးချယ်စရာနှင့် လမ်းညွှန် ပါဝင်သည်။</span>',
  })
  @ApiOkResponse({ type: AdhihtanCategory, isArray: true })
  getCategories(): AdhihtanCategory[] {
    return this.adhihtanService.getCategories();
  }

  @Get('categories/:categoryId')
  @ApiOperation({
    summary: 'Get one Adhihtan category',
    description:
      'Get the overview, benefits, cautions, and instructions for one category. Show this information before a user starts the practice. ' +
      '<span lang="my">အမျိုးအစားတစ်ခု၏ အကျဉ်းချုပ်၊ အကျိုးကျေးဇူး၊ သတိပြုရန်နှင့် လုပ်ဆောင်နည်းတို့ကို ရယူပါ။ အဓိဋ္ဌာန်မစမီ ဒီအချက်အလက်ကို အသုံးပြုသူအား ပြပါ။</span>',
  })
  @ApiParam({
    name: 'categoryId',
    type: Number,
    example: 1,
    description:
      '`value` from `GET /adhihtan/categories`. ' +
      '<span lang="my">`GET /adhihtan/categories` မှ `value` ဖြစ်သည်။</span>',
  })
  @ApiOkResponse({ type: AdhihtanCategory })
  @ApiNotFoundResponse({ description: notFoundDescription })
  getCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): AdhihtanCategory {
    return this.adhihtanService.getCategory(categoryId);
  }

  @Get('categories/:categoryId/schedules')
  @ApiOperation({
    summary: 'List schedule levels for a category',
    description:
      'Get every schedule level and its ordered daily entries for one category. Category 5 is custom, so this endpoint returns an empty list for category 5. ' +
      '<span lang="my">အမျိုးအစားတစ်ခု၏ schedule level အားလုံးနှင့် အစဉ်လိုက်နေ့စဉ်စာရင်းကို ရယူပါ။ Category ၅ သည် စိတ်ကြိုက်ဖြစ်သောကြောင့် ဒီ endpoint က category ၅ အတွက် စာရင်းအလွတ် ပြန်ပေးသည်။</span>',
  })
  @ApiParam({
    name: 'categoryId',
    type: Number,
    example: 1,
    description:
      '`value` from `GET /adhihtan/categories`. ' +
      '<span lang="my">`GET /adhihtan/categories` မှ `value` ဖြစ်သည်။</span>',
  })
  @ApiOkResponse({ type: AdhihtanScheduleLevel, isArray: true })
  @ApiNotFoundResponse({ description: notFoundDescription })
  getSchedules(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): AdhihtanScheduleLevel[] {
    return this.adhihtanService.getSchedules(categoryId);
  }

  @Get('categories/:categoryId/schedules/:levelId')
  @ApiOperation({
    summary: 'Get one category schedule level',
    description:
      'Get the daily entries for one level, in order. Each entry includes the day, spell name, repetition count, and vegetarian-day flag. Store user progress in the client. ' +
      '<span lang="my">Level တစ်ခု၏ နေ့စဉ်စာရင်းကို အစဉ်လိုက်ရယူပါ။ စာရင်းတစ်ခုစီတွင် နေ့၊ ဂုဏ်တော်အမည်၊ ပုတီးပတ်ရေနှင့် သက်သတ်လွတ်နေ့အမှတ်အသား ပါဝင်သည်။ အသုံးပြုသူ၏ progress ကို client တွင် သိမ်းပါ။</span>',
  })
  @ApiParam({
    name: 'categoryId',
    type: Number,
    example: 1,
    description:
      '`value` from `GET /adhihtan/categories`. ' +
      '<span lang="my">`GET /adhihtan/categories` မှ `value` ဖြစ်သည်။</span>',
  })
  @ApiParam({
    name: 'levelId',
    type: Number,
    example: 1,
    description:
      '`value` from the selected category’s schedule list. ' +
      '<span lang="my">ရွေးထားသော အမျိုးအစား၏ schedule စာရင်းမှ `value` ဖြစ်သည်။</span>',
  })
  @ApiOkResponse({ type: AdhihtanScheduleLevel })
  @ApiNotFoundResponse({ description: notFoundDescription })
  getScheduleLevel(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('levelId', ParseIntPipe) levelId: number,
  ): AdhihtanScheduleLevel {
    return this.adhihtanService.getScheduleLevel(categoryId, levelId);
  }

  @Get('spells')
  @ApiOperation({
    summary: 'List localized Adhihtan spell names',
    description:
      'Get the 35 display names stored under `default_spell_*` keys. Use the schedule entries for the spell name and sequence of a selected practice. ' +
      '<span lang="my">`default_spell_*` key များဖြင့် သိမ်းထားသော display name ၃၅ ခုကို ရယူပါ။ ရွေးထားသောအဓိဋ္ဌာန်၏ ဂုဏ်တော်အမည်နှင့် အစဉ်အတွက် schedule entry များကို သုံးပါ။</span>',
  })
  @ApiOkResponse({ type: AdhihtanSpell, isArray: true })
  getSpells(): AdhihtanSpell[] {
    return this.adhihtanService.getSpells();
  }

  @Get('spells/:spellId')
  @ApiOperation({
    summary: 'Get one localized Adhihtan spell name',
    description:
      'Get one display name by the number at the end of its key. For example, use `1` for `default_spell_1`. ' +
      '<span lang="my">Key ၏ နောက်ဆုံးနံပါတ်ဖြင့် display name တစ်ခုကို ရယူပါ။ ဥပမာ `default_spell_1` အတွက် `1` ကိုသုံးပါ။</span>',
  })
  @ApiParam({
    name: 'spellId',
    type: Number,
    example: 1,
    description:
      'Number at the end of a `default_spell_*` key. ' +
      '<span lang="my">`default_spell_*` key ၏ နောက်ဆုံးနံပါတ် ဖြစ်သည်။</span>',
  })
  @ApiOkResponse({ type: AdhihtanSpell })
  @ApiNotFoundResponse({ description: notFoundDescription })
  getSpell(@Param('spellId', ParseIntPipe) spellId: number): AdhihtanSpell {
    return this.adhihtanService.getSpell(spellId);
  }
}
