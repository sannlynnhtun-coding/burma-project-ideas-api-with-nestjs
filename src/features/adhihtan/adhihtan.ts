import { ApiProperty } from '@nestjs/swagger';

export class AdhihtanSourceMetadata {
  @ApiProperty({ example: 'com.a_dhi_htan' })
  packageName: string;

  @ApiProperty({ example: '1.3.1' })
  appVersion: string;

  @ApiProperty({ example: 96 })
  hermesBytecodeVersion: number;
}

export class AdhihtanLevelOption {
  @ApiProperty({ example: 'ပထမအဆင့်' })
  label: string;

  @ApiProperty({ example: 1 })
  value: number;
}

export class AdhihtanInformationItem {
  @ApiProperty({ example: 'အဓိဋ္ဌာန်အစီအစဉ်' })
  title: string;

  @ApiProperty({
    example: 'သတ်မှတ်ထားသော ဂုဏ်တော်အမှတ်စဉ်နှင့် ပုတီးပတ်ရေအတိုင်း စိပ်ပါ။',
  })
  description: string;

  @ApiProperty({ required: false, default: false })
  caution?: boolean;
}

export class AdhihtanDetailTabs {
  @ApiProperty({ type: AdhihtanInformationItem, isArray: true })
  benefits: AdhihtanInformationItem[];

  @ApiProperty({ type: AdhihtanInformationItem, isArray: true })
  instructions: AdhihtanInformationItem[];
}

export class AdhihtanCategory {
  @ApiProperty({ example: 'ကိုးနဝင်း' })
  label: string;

  @ApiProperty({ example: 1 })
  value: number;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '၈၁' })
  duration: string;

  @ApiProperty({ type: AdhihtanLevelOption, isArray: true })
  level: AdhihtanLevelOption[];

  @ApiProperty({ example: 'နေ့တိုင်း' })
  format: string;

  @ApiProperty({
    example: 'တစ်ဆင့်လျှင် သင်၏ အရေးအကြီးဆုံးကိစ္စတစ်ခုကို ဆုတောင်းနိုင်ပါသည်',
  })
  howToPray: string;

  @ApiProperty({ example: 'ဆုတောင်းပြည့်' })
  benefit: string;

  @ApiProperty({
    type: AdhihtanDetailTabs,
    required: false,
    nullable: true,
  })
  detailTabs?: AdhihtanDetailTabs | null;
}

export class AdhihtanScheduleEntry {
  @ApiProperty({ example: 1 })
  no: number;

  @ApiProperty({ example: 'monday' })
  enDay: string;

  @ApiProperty({ example: 'တနင်္လာ' })
  mmDay: string;

  @ApiProperty({ example: 'သမ္မာသမ္ဗုဒ္ဓေါ' })
  spellName: string;

  @ApiProperty({ example: 5 })
  spellId: number;

  @ApiProperty({ example: '၂' })
  spellCount: string;

  @ApiProperty({ example: 2 })
  spellEngCount: number;

  @ApiProperty({ example: false })
  isVagitable: boolean;
}

export class AdhihtanScheduleLevel {
  @ApiProperty({ example: 'ပထမအဆင့်' })
  label: string;

  @ApiProperty({ example: 1 })
  value: number;

  @ApiProperty({ type: AdhihtanScheduleEntry, isArray: true })
  datasources: AdhihtanScheduleEntry[];
}

export class AdhihtanSpell {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'default_spell_1' })
  key: string;

  @ApiProperty({ example: 'ဗုဒ္ဓံ သရဏံ ဂစ္ဆမိ' })
  name: string;
}

export class AdhihtanContent {
  @ApiProperty({ example: 1 })
  schemaVersion: number;

  @ApiProperty({ type: AdhihtanSourceMetadata })
  source: AdhihtanSourceMetadata;

  @ApiProperty({ type: AdhihtanCategory, isArray: true })
  categories: AdhihtanCategory[];

  @ApiProperty({
    type: 'object',
    description: 'Schedule levels keyed by category value.',
    additionalProperties: {
      type: 'array',
      items: { type: 'object' },
    },
  })
  schedules: Record<string, AdhihtanScheduleLevel[]>;

  @ApiProperty({
    type: 'object',
    description: 'Localized spell names keyed by default_spell identifier.',
    additionalProperties: { type: 'string' },
  })
  localizedSpellNames: Record<string, string>;
}
