import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MyanmarWordCheckStatus {
  Correct = 'correct',
  Misspelled = 'misspelled',
  Ignored = 'ignored',
}

export class MyanmarWordListMetadata {
  @ApiProperty({ example: 'Myanmar Word List' })
  name: string;

  @ApiProperty({ example: 'မြန်မာစာလုံးစာရင်း' })
  myanmarName: string;

  @ApiProperty({ example: 12467 })
  wordCount: number;

  @ApiProperty({ example: 100 })
  maxSearchResults: number;

  @ApiProperty({ example: 100 })
  maxBatchSize: number;

  @ApiProperty({ example: 64 })
  maxWordLength: number;

  @ApiProperty({ example: 5 })
  maxSuggestionsPerWord: number;

  @ApiProperty({
    type: [String],
    example: [
      'prefix-search',
      'batch-spell-check',
      'spelling-suggestions',
      'offline-word-list',
    ],
  })
  capabilities: string[];

  @ApiProperty({
    example: 'https://github.com/sannlynnhtun-coding/blazor-word-list',
  })
  sourceProjectUrl: string;

  @ApiProperty({ example: 'https://github.com/kanaung/wordlists' })
  wordListSourceUrl: string;

  @ApiProperty({ example: 'WTFPL' })
  license: string;

  @ApiProperty({
    example: 'https://github.com/kanaung/wordlists/blob/master/LICENSE',
  })
  licenseUrl: string;
}

export class MyanmarWordSearchResult {
  @ApiProperty({ example: 'ကကြ' })
  prefix: string;

  @ApiProperty({ example: 50 })
  limit: number;

  @ApiProperty({ example: 4 })
  count: number;

  @ApiProperty({
    type: [String],
    example: ['ကကြီး', 'ကကြိုး', 'ကကြီးထွန်'],
  })
  words: string[];
}

export class MyanmarWordCheckRequest {
  @ApiProperty({
    type: [String],
    minItems: 1,
    maxItems: 100,
    example: ['ကကြီး', 'ကကြီ', 'Myanmar'],
  })
  words: string[];

  @ApiPropertyOptional({
    type: Boolean,
    default: true,
    description:
      'Set to false when only spelling status is needed. ' +
      '<span lang="my">စာလုံးပေါင်းအခြေအနေကိုသာ လိုအပ်ပါက false သတ်မှတ်ပါ။</span>',
  })
  includeSuggestions?: boolean;
}

export class MyanmarWordCheckResult {
  @ApiProperty({ example: 'ကကြီ' })
  word: string;

  @ApiProperty({ enum: MyanmarWordCheckStatus })
  status: MyanmarWordCheckStatus;

  @ApiProperty({ example: false })
  isCorrect: boolean;

  @ApiProperty({
    type: [String],
    example: ['ကကြီး'],
  })
  suggestions: string[];
}

export class MyanmarWordCheckResponse {
  @ApiProperty({ example: 3 })
  wordCount: number;

  @ApiProperty({ example: 2 })
  checkedCount: number;

  @ApiProperty({ example: 1 })
  ignoredCount: number;

  @ApiProperty({ type: MyanmarWordCheckResult, isArray: true })
  results: MyanmarWordCheckResult[];
}
