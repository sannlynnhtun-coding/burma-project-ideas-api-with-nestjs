import { ApiProperty } from '@nestjs/swagger';

export enum MyanmarNameologyResultStatus {
  Empty = 'empty',
  NoMyanmarLetters = 'noMyanmarLetters',
  Success = 'success',
}

export class MyanmarNameologyMatchedLetter {
  @ApiProperty({ example: 'ဆ' })
  letter: string;

  @ApiProperty({ example: 3 })
  value: number;
}

export class MyanmarNameologyLetterGroup {
  @ApiProperty({ example: 1 })
  value: number;

  @ApiProperty({ example: 'တနင်္ဂနွေ' })
  dayName: string;

  @ApiProperty({ example: '၁' })
  myanmarNumber: string;

  @ApiProperty({ example: ['အ', 'ဣ', 'ဤ', 'ဥ', 'ဦ', 'ဧ', 'ဩ', 'ဪ'] })
  letters: string[];
}

export class MyanmarNameologyMeaning {
  @ApiProperty({ example: 3 })
  number: number;

  @ApiProperty({ example: 'သူခိုးကိန်း' })
  title: string;

  @ApiProperty({
    example:
      'အန္တရာယ်၊ သတိထားစရာ၊ အလွဲအမှားများကို သတိထားသင့်သူလို့ ယူဆကြပါတယ်။',
  })
  text: string;
}

export class MyanmarNameologyResult {
  @ApiProperty({
    enum: MyanmarNameologyResultStatus,
    example: MyanmarNameologyResultStatus.Success,
  })
  status: MyanmarNameologyResultStatus;

  @ApiProperty({ example: 'ဆန်းလင်းထွန်း' })
  name: string;

  @ApiProperty({ example: 'ရလဒ်ထွက်ပြီးပါပြီ။' })
  message: string;

  @ApiProperty({ example: 14 })
  total: number;

  @ApiProperty({ example: 21 })
  totalPlusSeven: number;

  @ApiProperty({ example: 3 })
  remainder: number;

  @ApiProperty({ example: 'ဆလထ' })
  keyword: string;

  @ApiProperty({ type: MyanmarNameologyMatchedLetter, isArray: true })
  matchedLetters: MyanmarNameologyMatchedLetter[];

  @ApiProperty({
    type: MyanmarNameologyMeaning,
    nullable: true,
    example: {
      number: 3,
      title: 'သူခိုးကိန်း',
      text: 'အန္တရာယ်၊ သတိထားစရာ၊ အလွဲအမှားများကို သတိထားသင့်သူလို့ ယူဆကြပါတယ်။',
    },
  })
  meaning: MyanmarNameologyMeaning | null;

  @ApiProperty({ example: true })
  isSuccess: boolean;
}
