import { Injectable, NotFoundException } from '@nestjs/common';
import {
  MyanmarNameologyLetterGroup,
  MyanmarNameologyMatchedLetter,
  MyanmarNameologyMeaning,
  MyanmarNameologyResult,
  MyanmarNameologyResultStatus,
} from './myanmar-nameology';

const ASAT = '်';
const VIRAMA = '္';
const NNYA = 'ဉ';
const NYA = 'ည';

@Injectable()
export class MyanmarNameologyService {
  private readonly letterGroups: MyanmarNameologyLetterGroup[] = [
    {
      value: 1,
      dayName: 'တနင်္ဂနွေ',
      myanmarNumber: '၁',
      letters: ['အ', 'ဣ', 'ဤ', 'ဥ', 'ဦ', 'ဧ', 'ဩ', 'ဪ'],
    },
    {
      value: 2,
      dayName: 'တနင်္လာ',
      myanmarNumber: '၂',
      letters: ['က', 'ခ', 'ဂ', 'ဃ', 'င'],
    },
    {
      value: 3,
      dayName: 'အင်္ဂါ',
      myanmarNumber: '၃',
      letters: ['စ', 'ဆ', 'ဇ', 'ဈ', 'ည'],
    },
    {
      value: 4,
      dayName: 'ဗုဒ္ဓဟူး',
      myanmarNumber: '၄',
      letters: ['ယ', 'ရ', 'လ', 'ဝ'],
    },
    {
      value: 5,
      dayName: 'ကြာသပတေး',
      myanmarNumber: '၅',
      letters: ['ပ', 'ဖ', 'ဗ', 'ဘ', 'မ'],
    },
    {
      value: 6,
      dayName: 'သောကြာ',
      myanmarNumber: '၆',
      letters: ['သ', 'ဟ', 'ဠ'],
    },
    {
      value: 7,
      dayName: 'စနေ',
      myanmarNumber: '၇',
      letters: ['တ', 'ထ', 'ဒ', 'ဓ', 'န'],
    },
  ];

  private readonly meanings: MyanmarNameologyMeaning[] = [
    {
      number: 1,
      title: 'သူဆင်းရဲကိန်း',
      text: 'ကြိုးစားသလောက် အကျိုးခံစားရမှုနည်းတတ်သူလို့ ယူဆကြပါတယ်။',
    },
    {
      number: 2,
      title: 'သူဌေးကိန်း',
      text: 'ငွေသုံးကြမ်းတတ်ပေမယ့် လိုအပ်ချိန်မှာ အခွင့်အလမ်းရတတ်သူလို့ ယူဆကြပါတယ်။',
    },
    {
      number: 3,
      title: 'သူခိုးကိန်း',
      text: 'အန္တရာယ်၊ သတိထားစရာ၊ အလွဲအမှားများကို သတိထားသင့်သူလို့ ယူဆကြပါတယ်။',
    },
    {
      number: 4,
      title: 'မင်းကိန်း',
      text: 'ထက်မြက်သူ၊ သြဇာရှိသူ၊ ဦးဆောင်နိုင်သူလို့ ယူဆကြပါတယ်။',
    },
    {
      number: 5,
      title: 'မိဖုရားကိန်း',
      text: 'အထောက်အပံ့ကောင်းရင် အောင်မြင်တတ်သူလို့ ယူဆကြပါတယ်။',
    },
    {
      number: 6,
      title: 'ဘီလူးကိန်း',
      text: 'ဘဝအတက်အကျ မြန်တတ်သူလို့ ယူဆကြပါတယ်။',
    },
    {
      number: 7,
      title: 'အမတ်ကိန်း',
      text: 'လူချစ်လူခင် ပေါများပြီး ဆက်ဆံရေးကောင်းတတ်သူလို့ ယူဆကြပါတယ်။',
    },
    {
      number: 8,
      title: 'ပုဏ္ဏားကိန်း',
      text: 'ကိုယ်ပိုင်အမြင်ပြင်းပြီး ကိုယ်တိုင်ဆုံးဖြတ်ချင်စိတ်များတတ်သူလို့ ယူဆကြပါတယ်။',
    },
    {
      number: 9,
      title: 'ရဟန်းကိန်း',
      text: 'တည်ငြိမ်မှု၊ သန့်ရှင်းမှု၊ သဘောထားကြီးမှုနဲ့ ဆက်စပ်ယူဆကြပါတယ်။',
    },
  ];

  private readonly letterValues = new Map<string, number>(
    this.letterGroups.flatMap((group) =>
      group.letters.map((letter) => [letter, group.value] as const),
    ),
  );

  private readonly meaningsByNumber = new Map<number, MyanmarNameologyMeaning>(
    this.meanings.map((meaning) => [meaning.number, meaning]),
  );

  getLetterGroups(): MyanmarNameologyLetterGroup[] {
    return this.letterGroups;
  }

  getMeanings(): MyanmarNameologyMeaning[] {
    return this.meanings;
  }

  getMeaning(number: number): MyanmarNameologyMeaning {
    const meaning = this.meaningsByNumber.get(number);

    if (!meaning) {
      throw new NotFoundException(
        `Myanmar nameology meaning with number ${number} not found`,
      );
    }

    return meaning;
  }

  calculate(input?: string): MyanmarNameologyResult {
    const name = input?.trim() ?? '';

    if (!name) {
      return this.unsuccessfulResult(
        MyanmarNameologyResultStatus.Empty,
        '',
        'တွက်ရန်အတွက် နာမည်တစ်ခု ထည့်ပေးပါ။',
      );
    }

    const keywordLetters = this.extractKeywordLetters(name);
    const matchedLetters: MyanmarNameologyMatchedLetter[] = keywordLetters.map(
      (letter) => ({ letter, value: this.letterValues.get(letter)! }),
    );

    if (matchedLetters.length === 0) {
      return this.unsuccessfulResult(
        MyanmarNameologyResultStatus.NoMyanmarLetters,
        name,
        'တွက်လို့ရမယ့် မြန်မာအက္ခရာများ ထည့်ပေးပါ။',
      );
    }

    const total = matchedLetters.reduce((sum, item) => sum + item.value, 0);
    const totalPlusSeven = total + 7;
    const modulo = totalPlusSeven % 9;
    const remainder = modulo === 0 ? 9 : modulo;

    return {
      status: MyanmarNameologyResultStatus.Success,
      name,
      message: 'ရလဒ်ထွက်ပြီးပါပြီ။',
      total,
      totalPlusSeven,
      remainder,
      keyword: keywordLetters.join(''),
      matchedLetters,
      meaning: this.meaningsByNumber.get(remainder)!,
      isSuccess: true,
    };
  }

  private unsuccessfulResult(
    status: MyanmarNameologyResultStatus,
    name: string,
    message: string,
  ): MyanmarNameologyResult {
    return {
      status,
      name,
      message,
      total: 0,
      totalPlusSeven: 0,
      remainder: 0,
      keyword: '',
      matchedLetters: [],
      meaning: null,
      isSuccess: false,
    };
  }

  private extractKeywordLetters(text: string): string[] {
    const letters: string[] = [];

    for (let index = 0; index < text.length; index += 1) {
      const letter = this.normalizeLetter(text[index]);

      if (
        !this.letterValues.has(letter) ||
        this.isStackedConsonantLead(text, index) ||
        this.isFinalConsonant(text, index)
      ) {
        continue;
      }

      letters.push(letter);
    }

    return letters;
  }

  private normalizeLetter(letter: string): string {
    return letter === NNYA ? NYA : letter;
  }

  private isStackedConsonantLead(text: string, index: number): boolean {
    return index + 1 < text.length && text[index + 1] === VIRAMA;
  }

  private isFinalConsonant(text: string, index: number): boolean {
    for (let nextIndex = index + 1; nextIndex < text.length; nextIndex += 1) {
      const character = text[nextIndex];

      if (character === ASAT) {
        return true;
      }

      if (!this.canAppearBeforeAsat(character)) {
        return false;
      }
    }

    return false;
  }

  private canAppearBeforeAsat(character: string): boolean {
    return character === '့' || character === 'း';
  }
}
