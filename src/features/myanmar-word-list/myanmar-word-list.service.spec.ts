import { BadRequestException } from '@nestjs/common';
import { MyanmarWordCheckStatus } from './myanmar-word-list';
import { MyanmarWordListService } from './myanmar-word-list.service';

describe('MyanmarWordListService', () => {
  let service: MyanmarWordListService;

  beforeEach(() => {
    service = new MyanmarWordListService();
  });

  it('loads one normalized, unique offline word list', () => {
    const rawWordList = service.getRawWordList();
    const words = rawWordList.trimEnd().split('\n');

    expect(service.getMetadata()).toMatchObject({
      wordCount: 12467,
      maxSearchResults: 100,
      maxBatchSize: 100,
      maxSuggestionsPerWord: 5,
      license: 'WTFPL',
    });
    expect(words).toHaveLength(12467);
    expect(new Set(words).size).toBe(words.length);
    expect(rawWordList).not.toContain('\uFEFF');
    expect(rawWordList.endsWith('\n')).toBe(true);
  });

  it('searches by exact prefix and applies deterministic ordering', () => {
    const result = service.search('ကကြ', 20);

    expect(result.words).toContain('ကကြီး');
    expect(result.words.every((word) => word.startsWith('ကကြ'))).toBe(true);
    expect(result.words).toEqual(
      [...result.words].sort((left, right) =>
        left.length === right.length
          ? left < right
            ? -1
            : left === right
              ? 0
              : 1
          : left.length - right.length,
      ),
    );
    expect(service.search()).toEqual({
      prefix: '',
      limit: 50,
      count: 0,
      words: [],
    });
  });

  it('checks correct, misspelled, and ignored words', () => {
    const response = service.check({
      words: ['ကကြီး', 'ကကြီ', 'Myanmar'],
    });

    expect(response).toMatchObject({
      wordCount: 3,
      checkedCount: 2,
      ignoredCount: 1,
    });
    expect(response.results[0]).toEqual({
      word: 'ကကြီး',
      status: MyanmarWordCheckStatus.Correct,
      isCorrect: true,
      suggestions: [],
    });
    expect(response.results[1]).toMatchObject({
      word: 'ကကြီ',
      status: MyanmarWordCheckStatus.Misspelled,
      isCorrect: false,
    });
    expect(response.results[1].suggestions).toContain('ကကြီး');
    expect(response.results[2]).toEqual({
      word: 'Myanmar',
      status: MyanmarWordCheckStatus.Ignored,
      isCorrect: true,
      suggestions: [],
    });
  });

  it('can skip suggestion work', () => {
    expect(
      service.check({
        words: ['ကကြီ'],
        includeSuggestions: false,
      }).results[0].suggestions,
    ).toEqual([]);
  });

  it('validates search and batch-check limits', () => {
    expect(() => service.search('က', 101)).toThrow(BadRequestException);
    expect(() => service.check({ words: [] })).toThrow(BadRequestException);
    expect(() =>
      service.check({ words: Array.from({ length: 101 }, () => 'က') }),
    ).toThrow(BadRequestException);
    expect(() => service.check({ words: [' '] })).toThrow(BadRequestException);
    expect(() => service.check({ words: ['က'.repeat(65)] })).toThrow(
      BadRequestException,
    );
  });
});
