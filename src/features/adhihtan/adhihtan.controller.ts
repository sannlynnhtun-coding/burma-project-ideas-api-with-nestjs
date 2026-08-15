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
  'The requested Adhihtan item was not found. ' +
  '<span lang="my">တောင်းဆိုထားသော အဓိဋ္ဌာန်အချက်အလက်ကို မတွေ့ပါ။</span>';

@ApiTags('Adhihtan')
@Controller('adhihtan')
export class AdhihtanController {
  constructor(private readonly adhihtanService: AdhihtanService) {}

  @Get('data.json')
  @ApiOperation({
    summary: 'Download all Adhihtan static data',
    description:
      'Returns the original static JSON payload in one request. Use it to bootstrap an offline client or cache categories, schedules, and localized spell names together. ' +
      '<span lang="my">မူရင်း static JSON data အားလုံးကို request တစ်ကြိမ်တည်းဖြင့် ရယူနိုင်သည်။ Offline client စတင်ရန် သို့မဟုတ် အမျိုးအစား၊ အချိန်ဇယားနှင့် ဂုဏ်တော်အမည်များကို တစ်ပါတည်း cache လုပ်ရန် အသုံးပြုပါ။</span>',
  })
  @ApiOkResponse({
    type: AdhihtanContent,
    description:
      'The complete, unmodified Adhihtan static data document. ' +
      '<span lang="my">မပြောင်းလဲထားသော အဓိဋ္ဌာန် static data အပြည့်အစုံ။</span>',
  })
  getRawData(): AdhihtanContent {
    return this.adhihtanService.getContent();
  }

  @Get('categories')
  @ApiOperation({
    summary: 'List Adhihtan categories',
    description:
      'Flow step 1: list the five available practices so the client can present a category picker. Each item includes its duration, format, benefit summary, level choices, and detailed guidance. ' +
      '<span lang="my">Flow အဆင့် ၁ — ရရှိနိုင်သော အဓိဋ္ဌာန်အမျိုးအစား ငါးမျိုးကို ရယူပြီး client တွင် ရွေးချယ်စရာအဖြစ် ပြပါ။ တစ်ခုချင်းစီတွင် ကြာချိန်၊ ပုံစံ၊ အကျိုးအနှစ်ချုပ်၊ အဆင့်ရွေးချယ်စရာနှင့် အသေးစိတ်လမ်းညွှန် ပါဝင်သည်။</span>',
  })
  @ApiOkResponse({ type: AdhihtanCategory, isArray: true })
  getCategories(): AdhihtanCategory[] {
    return this.adhihtanService.getCategories();
  }

  @Get('categories/:categoryId')
  @ApiOperation({
    summary: 'Get one Adhihtan category',
    description:
      'Flow step 2: retrieve the selected category and show its overview, benefits, cautions, and instructions before the user starts a plan. ' +
      '<span lang="my">Flow အဆင့် ၂ — ရွေးထားသော အမျိုးအစား၏ အကျဉ်းချုပ်၊ အကျိုးကျေးဇူး၊ သတိပြုရန်နှင့် လုပ်ဆောင်နည်းတို့ကို အစီအစဉ်မစမီ ပြသရန် ရယူပါ။</span>',
  })
  @ApiParam({
    name: 'categoryId',
    type: Number,
    example: 1,
    description:
      'Category value from the category list. ' +
      '<span lang="my">အမျိုးအစားစာရင်းမှ category value ဖြစ်သည်။</span>',
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
    summary: 'List every schedule level for a category',
    description:
      'Flow step 3: after a category is selected, retrieve all of its levels and daily chant entries. Category 5 is intentionally client-defined and therefore returns an empty list. ' +
      '<span lang="my">Flow အဆင့် ၃ — အမျိုးအစားရွေးပြီးနောက် ၎င်း၏ အဆင့်များနှင့် နေ့စဉ်စိပ်ရမည့်စာရင်းအားလုံးကို ရယူပါ။ Category ၅ သည် client တွင် စိတ်ကြိုက်သတ်မှတ်ရသောကြောင့် စာရင်းအလွတ် ပြန်ပေးမည်။</span>',
  })
  @ApiParam({
    name: 'categoryId',
    type: Number,
    example: 1,
    description:
      'Category value from the category list. ' +
      '<span lang="my">အမျိုးအစားစာရင်းမှ category value ဖြစ်သည်။</span>',
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
      'Flow step 4: retrieve the chosen level and its ordered daily entries. The client can use each entry’s day, spell, count, and vegetarian-day flag while tracking progress locally. ' +
      '<span lang="my">Flow အဆင့် ၄ — ရွေးထားသောအဆင့်နှင့် အစဉ်လိုက် နေ့စဉ်စာရင်းကို ရယူပါ။ Client သည် နေ့၊ ဂုဏ်တော်၊ ပုတီးပတ်ရေနှင့် သက်သတ်လွတ်နေ့အမှတ်အသားတို့ကို အသုံးပြုပြီး progress ကို local တွင် သိမ်းနိုင်သည်။</span>',
  })
  @ApiParam({
    name: 'categoryId',
    type: Number,
    example: 1,
    description:
      'Category value from the category list. ' +
      '<span lang="my">အမျိုးအစားစာရင်းမှ category value ဖြစ်သည်။</span>',
  })
  @ApiParam({
    name: 'levelId',
    type: Number,
    example: 1,
    description:
      'Level value from the selected category schedule. ' +
      '<span lang="my">ရွေးထားသော အမျိုးအစား schedule မှ level value ဖြစ်သည်။</span>',
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
      'Returns the 35 localized names recovered from the static source as normalized id, key, and name records. Use this as a display-name lookup; schedule entries remain the source of truth for a selected plan. ' +
      '<span lang="my">Static source မှရရှိသော ဂုဏ်တော်အမည် ၃၅ ခုကို id၊ key နှင့် name ပုံစံဖြင့် ပြန်ပေးသည်။ Display name ရှာရန်သုံးပြီး ရွေးထားသောအစီအစဉ်အတွက် schedule entry ကို အဓိက data အဖြစ် သုံးပါ။</span>',
  })
  @ApiOkResponse({ type: AdhihtanSpell, isArray: true })
  getSpells(): AdhihtanSpell[] {
    return this.adhihtanService.getSpells();
  }

  @Get('spells/:spellId')
  @ApiOperation({
    summary: 'Get one localized Adhihtan spell name',
    description:
      'Retrieves one localized display name by the numeric suffix of its static key, for example 1 for default_spell_1. ' +
      '<span lang="my">Static key ၏ နောက်ဆုံးနံပါတ်ဖြင့် ဂုဏ်တော် display name တစ်ခုကို ရယူသည်။ ဥပမာ default_spell_1 အတွက် 1 ကို အသုံးပြုပါ။</span>',
  })
  @ApiParam({
    name: 'spellId',
    type: Number,
    example: 1,
    description:
      'Numeric suffix from a default_spell key. ' +
      '<span lang="my">default_spell key မှ နောက်ဆုံးနံပါတ် ဖြစ်သည်။</span>',
  })
  @ApiOkResponse({ type: AdhihtanSpell })
  @ApiNotFoundResponse({ description: notFoundDescription })
  getSpell(@Param('spellId', ParseIntPipe) spellId: number): AdhihtanSpell {
    return this.adhihtanService.getSpell(spellId);
  }
}
