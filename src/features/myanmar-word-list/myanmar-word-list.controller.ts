import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProduces,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  MyanmarWordCheckRequest,
  MyanmarWordCheckResponse,
  MyanmarWordListMetadata,
  MyanmarWordSearchResult,
} from './myanmar-word-list';
import { MyanmarWordListService } from './myanmar-word-list.service';

const badRequestDescription =
  'The search limit or spell-check body is invalid. Check the documented limits and try again. ' +
  '<span lang="my">ရှာဖွေမှုအရေအတွက် သို့မဟုတ် စာလုံးပေါင်းစစ်ဆေးမှု body မမှန်ပါ။ သတ်မှတ်ထားသော ကန့်သတ်ချက်များကို စစ်ပြီး ထပ်မံကြိုးစားပါ။</span>';

@ApiTags('myanmar-word-list | မြန်မာစာလုံးစာရင်း')
@Controller('myanmar-word-list')
export class MyanmarWordListController {
  constructor(
    private readonly myanmarWordListService: MyanmarWordListService,
  ) {}

  @Get('meta')
  @ApiOperation({
    summary: 'Get word-list metadata',
    description:
      'Get the word count, request limits, supported capabilities, source projects, and data license. ' +
      '<span lang="my">စာလုံးအရေအတွက်၊ request ကန့်သတ်ချက်များ၊ အသုံးပြုနိုင်သောလုပ်ဆောင်ချက်များ၊ မူရင်း project များနှင့် ဒေတာလိုင်စင်ကို ရယူပါ။</span>',
  })
  @ApiOkResponse({ type: MyanmarWordListMetadata })
  getMetadata(): MyanmarWordListMetadata {
    return this.myanmarWordListService.getMetadata();
  }

  @Get('words')
  @ApiOperation({
    summary: 'Search words by prefix',
    description:
      'Return words that start with the supplied prefix, ordered by length and then by Unicode code-unit order. A blank or omitted prefix returns an empty result. ' +
      '<span lang="my">ပေးထားသော prefix ဖြင့်စသော စာလုံးများကို အရှည်၊ ထို့နောက် Unicode code-unit အစဉ်အလိုက် ပြန်ပေးသည်။ Prefix အလွတ်ဖြစ်ပါက သို့မဟုတ် မပေးထားပါက result အလွတ်ပြန်ပေးသည်။</span>',
  })
  @ApiQuery({
    name: 'prefix',
    required: false,
    type: String,
    example: 'ကကြ',
    description:
      'Prefix to match exactly. ' +
      '<span lang="my">တိကျစွာ တိုက်စစ်မည့် စာလုံးအစဖြစ်သည်။</span>',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 50,
    description:
      'Maximum number of words to return, from 1 through 100. The default is 50. ' +
      '<span lang="my">ပြန်ပေးမည့် စာလုံးအများဆုံးအရေအတွက် ၁ မှ ၁၀၀ အတွင်းဖြစ်သည်။ မူလတန်ဖိုးမှာ ၅၀ ဖြစ်သည်။</span>',
  })
  @ApiOkResponse({ type: MyanmarWordSearchResult })
  @ApiBadRequestResponse({ description: badRequestDescription })
  search(
    @Query('prefix') prefix?: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): MyanmarWordSearchResult {
    return this.myanmarWordListService.search(prefix, limit);
  }

  @Post('check')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Check words and get spelling suggestions',
    description:
      'Check up to 100 words in one request. Known words are marked correct, unknown Myanmar words can receive up to five edit-distance suggestions, and ASCII-only words are marked ignored to preserve the source app behavior. ' +
      '<span lang="my">Request တစ်ကြိမ်တွင် စာလုံး ၁၀၀ အထိ စစ်ဆေးပါ။ ရှိပြီးသားစာလုံးများကို မှန်ကန်ကြောင်းပြပြီး မသိသောမြန်မာစာလုံးများအတွက် edit distance အလိုက် အကြံပြုစာလုံး ငါးလုံးအထိ ပြန်ပေးနိုင်သည်။ မူရင်း app ၏လုပ်ဆောင်ပုံအတိုင်း ASCII စာလုံးသီးသန့်ကို ignored အဖြစ် သတ်မှတ်သည်။</span>',
  })
  @ApiBody({ type: MyanmarWordCheckRequest })
  @ApiOkResponse({ type: MyanmarWordCheckResponse })
  @ApiBadRequestResponse({ description: badRequestDescription })
  check(@Body() request: MyanmarWordCheckRequest): MyanmarWordCheckResponse {
    return this.myanmarWordListService.check(request);
  }

  @Get('words.list')
  @Header('Content-Type', 'text/plain; charset=utf-8')
  @ApiProduces('text/plain')
  @ApiOperation({
    summary: 'Download the normalized word list',
    description:
      'Download one UTF-8 word per line for offline lookup or private client-side spell checking. Duplicate entries and byte-order marks are removed. ' +
      '<span lang="my">Offline ရှာဖွေမှု သို့မဟုတ် client တွင် သီးသန့်စာလုံးပေါင်းစစ်ဆေးမှုအတွက် UTF-8 စာလုံးတစ်လုံးစီကို တစ်ကြောင်းစီဖြင့် download လုပ်ပါ။ ထပ်နေသောစာလုံးနှင့် byte-order mark များကို ဖယ်ထားသည်။</span>',
  })
  @ApiOkResponse({
    description:
      'Normalized newline-delimited word list. ' +
      '<span lang="my">သန့်စင်ထားသော တစ်ကြောင်းတစ်လုံး စာလုံးစာရင်း။</span>',
    schema: { type: 'string', example: 'က\nကကတစ်\nကကုသန်\n' },
  })
  getRawWordList(): string {
    return this.myanmarWordListService.getRawWordList();
  }
}
