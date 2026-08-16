import { NotFoundException } from '@nestjs/common';
import { MyanmarNameologyResultStatus } from './myanmar-nameology';
import { MyanmarNameologyService } from './myanmar-nameology.service';

describe('MyanmarNameologyService', () => {
  let service: MyanmarNameologyService;

  beforeEach(() => {
    service = new MyanmarNameologyService();
  });

  it('returns the weekday letter groups and meanings', () => {
    expect(service.getLetterGroups()).toHaveLength(7);
    expect(service.getLetterGroups()[0]).toEqual({
      value: 1,
      dayName: 'တနင်္ဂနွေ',
      myanmarNumber: '၁',
      letters: ['အ', 'ဣ', 'ဤ', 'ဥ', 'ဦ', 'ဧ', 'ဩ', 'ဪ'],
    });
    expect(service.getMeanings()).toHaveLength(9);
    expect(service.getMeaning(3).title).toBe('သူခိုးကိန်း');
  });

  it.each([
    ['ဆလထ', 'ဆလထ', 14, 21, 3, 'သူခိုးကိန်း', 'ဆ=3 + လ=4 + ထ=7'],
    ['ဆန်းလင်းထွန်း', 'ဆလထ', 14, 21, 3, 'သူခိုးကိန်း', 'ဆ=3 + လ=4 + ထ=7'],
    ['ဘုန်းဝင့်ထွန်း', 'ဘဝထ', 16, 23, 5, 'မိဖုရားကိန်း', 'ဘ=5 + ဝ=4 + ထ=7'],
    ['ဉာဏ်လင်းထွန်း', 'ညလထ', 14, 21, 3, 'သူခိုးကိန်း', 'ည=3 + လ=4 + ထ=7'],
    ['သီရိလင်း', 'သရလ', 14, 21, 3, 'သူခိုးကိန်း', 'သ=6 + ရ=4 + လ=4'],
    ['လှိုင်မျိုးအောင်', 'လမအ', 10, 17, 8, 'ပုဏ္ဏားကိန်း', 'လ=4 + မ=5 + အ=1'],
    ['ဥက္ကအောင်', 'ဥကအ', 4, 11, 2, 'သူဌေးကိန်း', 'ဥ=1 + က=2 + အ=1'],
  ])(
    'calculates %s using the source project rules',
    (
      input,
      expectedKeyword,
      expectedTotal,
      expectedTotalPlusSeven,
      expectedRemainder,
      expectedTitle,
      expectedBreakdown,
    ) => {
      const result = service.calculate(input as string);

      expect(result.status).toBe(MyanmarNameologyResultStatus.Success);
      expect(result.isSuccess).toBe(true);
      expect(result.name).toBe(input);
      expect(result.keyword).toBe(expectedKeyword);
      expect(result.total).toBe(expectedTotal);
      expect(result.totalPlusSeven).toBe(expectedTotalPlusSeven);
      expect(result.remainder).toBe(expectedRemainder);
      expect(result.meaning?.title).toBe(expectedTitle);
      expect(
        result.matchedLetters
          .map((item) => `${item.letter}=${item.value}`)
          .join(' + '),
      ).toBe(expectedBreakdown);
    },
  );

  it.each([undefined, '', '   '])('returns an empty result for %p', (input) => {
    expect(service.calculate(input)).toMatchObject({
      status: MyanmarNameologyResultStatus.Empty,
      name: '',
      keyword: '',
      matchedLetters: [],
      meaning: null,
      isSuccess: false,
    });
  });

  it('returns a no-Myanmar-letters result for Latin input', () => {
    expect(service.calculate('Sann Lynn Htun')).toMatchObject({
      status: MyanmarNameologyResultStatus.NoMyanmarLetters,
      name: 'Sann Lynn Htun',
      keyword: '',
      matchedLetters: [],
      meaning: null,
      isSuccess: false,
    });
  });

  it('rejects an unknown meaning number', () => {
    expect(() => service.getMeaning(10)).toThrow(NotFoundException);
  });
});
