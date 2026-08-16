# Burma Project Ideas API with Nest.js

## Installation and Setup

To deploy the project using Vercel, follow these simple steps:

1. Install Vercel globally:
   ```bash
   npm i -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

3. Select your email and provide the necessary credentials when prompted.

4. Deploy the project in production mode:
   ```bash
   vercel --prod
   ```

## Common Issues and Fixes

### PowerShell Execution Policy Error

If you encounter an error similar to the one below when executing scripts in PowerShell:

```
ng : File C:\Users\d\AppData\Roaming\npm\ng.ps1 cannot be loaded
```

This error occurs because your system's PowerShell is not configured to allow the execution of scripts by default. This issue is particularly common on Windows 10, especially when using Visual Studio Code with PowerShell as the default terminal.

#### How to Fix

You can resolve this issue by running the following command in the PowerShell terminal:

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Useful Commands

### Creating a Controller in NestJS

To generate a controller in your NestJS application without creating a separate folder, use the command:

```bash
nest g co [controller name]
```

Simply replace `[controller name]` with the desired name for your controller.

### Running the NestJS Application in Development Mode

To start your NestJS application in development mode with automatic file watching, run:

```bash
npm run start:dev --watch
```

This command ensures that your server restarts automatically whenever changes are detected.

------

## Acknowledgements

Special thanks to the [Stack Overflow community](https://stackoverflow.com/questions/72863930/why-am-i-suddenly-getting-ng-file-c-users-d-appdata-roaming-npm-ng-ps1-canno) for providing solutions to common PowerShell execution policy issues.

# Projects

This document outlines the project status. Finished API features are checked against the controllers registered in `src/app.module.ts`.

## Finished API Features

- [x] adhihtan
- [x] Art Gallery
- [x] Bagan Map
- [x] Birds
- [x] Burmese Agriculture
- [x] Burmese Recipes
- [x] Dream Dictionary
- [x] Incompatible Food
- [x] Min Thein Kha - Lat Htauk Bay Din
- [x] Missing Historical Records
- [x] Myanmar Months
- [x] Myanmar Nameology
- [x] Myanmar Proverbs
- [x] Myanmar Word List
- [x] NatMyatSi
- [x] Phayar Sar
- [x] Pick A Pile
- [x] Quotlets
- [x] Snakes
- [x] Zodiac

## Not Finished / Separate Projects

- [ ] Banking Management System
- [ ] Movie Ticket Online Booking System

## NatMyatSi API flow

NatMyatSi uses static data from `public/nat-myat-si/data.json`. The client selects a question, shuffles and hides the 16 symbols, then requests the reading for the selected question and revealed symbol.

```http
GET /nat-myat-si/questions
GET /nat-myat-si/questions?search=အိမ်ထောင်
GET /nat-myat-si/questions/:questionId
GET /nat-myat-si/symbols
GET /nat-myat-si/readings/:questionId/:symbolId
```

## Phayar Sar API flow

Phayar Sar lists prayer groups and returns one prayer by its numeric group and
detail IDs. Appended entries from the PhayarSar iOS project also include the
original source ID, background text, and paragraph-level pronunciation while
retaining the combined `content` field used by existing clients.

<p lang="my">Phayar Sar API တွင် ဘုရားစာအုပ်စုများကို စာရင်းပြုပြီး အုပ်စု ID နှင့် စာ ID ဖြင့် ဘုရားစာတစ်ပုဒ်ကို ရယူနိုင်သည်။ PhayarSar iOS project မှ ထပ်ဖြည့်ထားသော စာများတွင် မူရင်း source ID၊ အကြောင်းအရာနှင့် စာပိုဒ်အလိုက် အသံထွက်တို့ ပါဝင်ပြီး လက်ရှိ client များအသုံးပြုသည့် <code>content</code> field ကိုလည်း ဆက်လက်ထိန်းသိမ်းထားသည်။</p>

```http
GET /phayar-sar
GET /phayar-sar/:groupId/:detailId
```

The appended prayer data comes from
[KyawTheMonkey/PhayarSar](https://github.com/KyawTheMonkey/PhayarSar) under the
included MIT license. Re-import it from a sibling checkout with
`npm run import:phayar-sar` or pass a resource directory with
`npm run import:phayar-sar -- --source <directory>`.

## adhihtan API flow

adhihtan is a read-only static-content API. A client lists the categories,
shows the selected category guidance, loads all schedules or one schedule
level, and then tracks dates, counts, completion, and custom category 5 state
locally. The raw JSON endpoint supports one-request offline bootstrapping, while
the REST endpoints support smaller, focused reads.

<p lang="my">adhihtan သည် read-only static-content API ဖြစ်သည်။ Client က အမျိုးအစားစာရင်းကို ရယူပြီး ရွေးထားသောအမျိုးအစား၏ လမ်းညွှန်ကိုပြသကာ schedule အားလုံး သို့မဟုတ် schedule level တစ်ခုကို ရယူသည်။ ရက်စွဲ၊ ရေတွက်မှု၊ ပြီးစီးမှုနှင့် စိတ်ကြိုက် category ၅ ၏ state ကို client က local တွင် သိမ်းဆည်းရမည်။ Raw JSON endpoint သည် offline အတွက် data အပြည့်အစုံကို request တစ်ကြိမ်တည်းဖြင့် ရယူနိုင်စေပြီး REST endpoints များသည် လိုအပ်သောအပိုင်းကိုသာ ရယူနိုင်စေသည်။</p>

```http
GET /adhihtan/data.json
GET /adhihtan/categories
GET /adhihtan/categories/:categoryId
GET /adhihtan/categories/:categoryId/schedules
GET /adhihtan/categories/:categoryId/schedules/:levelId
GET /adhihtan/spells
GET /adhihtan/spells/:spellId
```

## Myanmar Nameology API flow

Myanmar Nameology is a read-only calculator and reference API. A client sends a
Myanmar name to the calculation endpoint and receives the extracted keyword,
letter-value breakdown, arithmetic result, and matching traditional meaning.
The reference endpoints expose the seven weekday letter groups and nine
meanings. The calculator is provided for entertainment and is not scientifically
validated.

<p lang="my">Myanmar Nameology သည် read-only တွက်ချက်မှုနှင့် ကိုးကား API ဖြစ်သည်။ Client က မြန်မာနာမည်ကို calculation endpoint သို့ပို့ပြီး ထုတ်ယူထားသော အမည်ကီး၊ အက္ခရာတန်ဖိုးခွဲခြမ်းချက်၊ တွက်ချက်မှုရလဒ်နှင့် ကိုက်ညီသော ရိုးရာအဓိပ္ပာယ်ကို ရယူသည်။ Reference endpoint များတွင် နေ့နံအက္ခရာအုပ်စု ခုနစ်ခုနှင့် အဓိပ္ပာယ် ကိုးမျိုးကို ရယူနိုင်သည်။ ဤတွက်ချက်မှုသည် ဖျော်ဖြေရေးအတွက်သာဖြစ်ပြီး သိပ္ပံနည်းကျ အတည်ပြုထားခြင်းမရှိပါ။</p>

```http
GET /myanmar-nameology/calculate?name=ဆန်းလင်းထွန်း
GET /myanmar-nameology/letter-groups
GET /myanmar-nameology/meanings
GET /myanmar-nameology/meanings/:number
```

## Myanmar Word List API flow

Myanmar Word List provides prefix search, batch spelling checks, edit-distance
suggestions, and a normalized UTF-8 download. ASCII-only words are ignored to
match the source Blazor app. Clients that need private or offline spell checking
can download the full list and process text locally instead of sending words to
the server.

<p lang="my">Myanmar Word List တွင် prefix ရှာဖွေမှု၊ အစုလိုက်စာလုံးပေါင်းစစ်ဆေးမှု၊ edit-distance အလိုက် အကြံပြုစာလုံးများနှင့် သန့်စင်ထားသော UTF-8 စာလုံးစာရင်း download ပါဝင်သည်။ မူရင်း Blazor app နှင့် ကိုက်ညီစေရန် ASCII စာလုံးသီးသန့်ကို ignored အဖြစ် သတ်မှတ်သည်။ ကိုယ်ပိုင် သို့မဟုတ် offline စာလုံးပေါင်းစစ်ဆေးမှုလိုအပ်သော client များသည် စာလုံးများကို server သို့ မပို့ဘဲ စာလုံးစာရင်းအပြည့်အစုံကို download လုပ်၍ local တွင် စစ်ဆေးနိုင်သည်။</p>

```http
GET /myanmar-word-list/meta
GET /myanmar-word-list/words?prefix=ကကြ&limit=50
POST /myanmar-word-list/check
GET /myanmar-word-list/words.list
```

The data is credited to
[Kanaung Wordlists](https://github.com/kanaung/wordlists) and is distributed by
that source under the
[WTFPL](https://github.com/kanaung/wordlists/blob/master/LICENSE).

<p lang="my">ဒေတာမူရင်းအဖြစ် <a href="https://github.com/kanaung/wordlists">Kanaung Wordlists</a> ကို credit ပေးထားပြီး ထိုမူရင်း repository တွင် <a href="https://github.com/kanaung/wordlists/blob/master/LICENSE">WTFPL</a> လိုင်စင်ဖြင့် ဖြန့်ချိထားသည်။</p>
