import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  MyanmarNameologyLetterGroup,
  MyanmarNameologyMeaning,
  MyanmarNameologyResult,
} from './myanmar-nameology';
import { MyanmarNameologyService } from './myanmar-nameology.service';

@ApiTags('myanmar-nameology | မြန်မာနာမည်ကိန်း')
@Controller('myanmar-nameology')
export class MyanmarNameologyController {
  constructor(
    private readonly myanmarNameologyService: MyanmarNameologyService,
  ) {}

  @Get('calculate')
  @ApiOperation({
    summary: 'Calculate a Myanmar name number',
    description:
      'Extract supported Myanmar letters from a name, add their weekday values, add 7, and divide by 9 to select a traditional meaning. Final consonants and the leading consonant in a stacked pair are skipped. This entertainment result is based on a traditional belief and is not scientifically validated. ' +
      '<span lang="my">နာမည်မှ တွက်နိုင်သော မြန်မာအက္ခရာများကို ထုတ်ယူပြီး နေ့နံတန်ဖိုးများပေါင်းပါ၊ ၇ ပေါင်းပြီး ၉ နှင့်စားကာ အကြွင်းအလိုက် ရိုးရာအဓိပ္ပာယ်ကို ရယူပါ။ အသတ်နှင့်ဆုံးသော ဗျည်းများနှင့် ပါဌ်ဆင့်ရှိ ရှေ့ဗျည်းကို ကျော်ထားသည်။ ဤဖျော်ဖြေရေးရလဒ်သည် ရိုးရာယုံကြည်မှုအပေါ် အခြေခံပြီး သိပ္ပံနည်းကျ အတည်ပြုထားခြင်းမရှိပါ။</span>',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    example: 'ဆန်းလင်းထွန်း',
    description:
      'Myanmar name to calculate. An omitted or blank value returns an `empty` result. ' +
      '<span lang="my">တွက်ချက်မည့် မြန်မာနာမည်။ မပေးထားပါက သို့မဟုတ် အလွတ်ဖြစ်ပါက `empty` result ပြန်ပေးသည်။</span>',
  })
  @ApiOkResponse({
    type: MyanmarNameologyResult,
    description:
      'The extracted keyword, value breakdown, arithmetic result, and matching traditional meaning. ' +
      '<span lang="my">ထုတ်ယူထားသော အမည်ကီး၊ တန်ဖိုးခွဲခြမ်းချက်၊ တွက်ချက်မှုရလဒ်နှင့် ကိုက်ညီသော ရိုးရာအဓိပ္ပာယ်။</span>',
  })
  calculate(@Query('name') name?: string): MyanmarNameologyResult {
    return this.myanmarNameologyService.calculate(name);
  }

  @Get('letter-groups')
  @ApiOperation({
    summary: 'List Myanmar weekday letter values',
    description:
      'Get the seven weekday groups and the Myanmar letters assigned to values 1 through 7. ' +
      '<span lang="my">နေ့နံအုပ်စု ခုနစ်ခုနှင့် ၁ မှ ၇ အထိ တန်ဖိုးသတ်မှတ်ထားသော မြန်မာအက္ခရာများကို ရယူပါ။</span>',
  })
  @ApiOkResponse({ type: MyanmarNameologyLetterGroup, isArray: true })
  getLetterGroups(): MyanmarNameologyLetterGroup[] {
    return this.myanmarNameologyService.getLetterGroups();
  }

  @Get('meanings')
  @ApiOperation({
    summary: 'List Myanmar name-number meanings',
    description:
      'Get the nine traditional meanings used for calculation remainders 1 through 9. ' +
      '<span lang="my">တွက်ချက်မှုအကြွင်း ၁ မှ ၉ အထိ အသုံးပြုသော ရိုးရာကိန်းအဓိပ္ပာယ် ကိုးမျိုးကို ရယူပါ။</span>',
  })
  @ApiOkResponse({ type: MyanmarNameologyMeaning, isArray: true })
  getMeanings(): MyanmarNameologyMeaning[] {
    return this.myanmarNameologyService.getMeanings();
  }

  @Get('meanings/:number')
  @ApiOperation({
    summary: 'Get one Myanmar name-number meaning',
    description:
      'Get the traditional meaning for one calculation remainder. ' +
      '<span lang="my">တွက်ချက်မှုအကြွင်းတစ်ခု၏ ရိုးရာကိန်းအဓိပ္ပာယ်ကို ရယူပါ။</span>',
  })
  @ApiParam({
    name: 'number',
    type: Number,
    example: 3,
    description:
      'Remainder number from 1 through 9. ' +
      '<span lang="my">၁ မှ ၉ အတွင်းရှိ အကြွင်းကိန်း။</span>',
  })
  @ApiOkResponse({ type: MyanmarNameologyMeaning })
  @ApiNotFoundResponse({
    description:
      'No meaning matches the supplied number. Use a number from 1 through 9. ' +
      '<span lang="my">ပေးထားသောကိန်းနှင့် ကိုက်ညီသည့် အဓိပ္ပာယ်မရှိပါ။ ၁ မှ ၉ အတွင်းရှိ ကိန်းကိုသုံးပါ။</span>',
  })
  getMeaning(
    @Param('number', ParseIntPipe) number: number,
  ): MyanmarNameologyMeaning {
    return this.myanmarNameologyService.getMeaning(number);
  }
}
