import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { getPublicRoot } from '../../static-assets';
import {
  MyanmarWordCheckRequest,
  MyanmarWordCheckResponse,
  MyanmarWordCheckResult,
  MyanmarWordCheckStatus,
  MyanmarWordListMetadata,
  MyanmarWordSearchResult,
} from './myanmar-word-list';

const DEFAULT_SEARCH_LIMIT = 50;
const MAX_SEARCH_RESULTS = 100;
const MAX_BATCH_SIZE = 100;
const MAX_WORD_LENGTH = 64;
const MAX_SUGGESTIONS_PER_WORD = 5;
const MAX_SUGGESTION_DISTANCE = 2;

interface SuggestionCandidate {
  word: string;
  distance: number;
}

@Injectable()
export class MyanmarWordListService {
  private readonly orderedWords: string[];
  private readonly words: Set<string>;
  private readonly wordsByLength = new Map<number, string[]>();
  private readonly suggestionCache = new Map<string, string[]>();
  private readonly rawWordList: string;

  constructor() {
    const dataPath = path.join(
      getPublicRoot(),
      'myanmar-word-list',
      'source.list',
    );
    const seen = new Set<string>();

    this.orderedWords = fs
      .readFileSync(dataPath, 'utf8')
      .split(/\r?\n/)
      .map((word) => this.cleanWord(word))
      .filter((word) => {
        if (!word || seen.has(word)) {
          return false;
        }

        seen.add(word);
        return true;
      });
    this.words = seen;
    this.rawWordList = `${this.orderedWords.join('\n')}\n`;

    for (const word of this.orderedWords) {
      const wordsWithLength = this.wordsByLength.get(word.length) ?? [];
      wordsWithLength.push(word);
      this.wordsByLength.set(word.length, wordsWithLength);
    }
  }

  getMetadata(): MyanmarWordListMetadata {
    return {
      name: 'Myanmar Word List',
      myanmarName: 'မြန်မာစာလုံးစာရင်း',
      wordCount: this.words.size,
      maxSearchResults: MAX_SEARCH_RESULTS,
      maxBatchSize: MAX_BATCH_SIZE,
      maxWordLength: MAX_WORD_LENGTH,
      maxSuggestionsPerWord: MAX_SUGGESTIONS_PER_WORD,
      capabilities: [
        'prefix-search',
        'batch-spell-check',
        'spelling-suggestions',
        'offline-word-list',
      ],
      sourceProjectUrl:
        'https://github.com/sannlynnhtun-coding/blazor-word-list',
      wordListSourceUrl: 'https://github.com/kanaung/wordlists',
      license: 'WTFPL',
      licenseUrl: 'https://github.com/kanaung/wordlists/blob/master/LICENSE',
    };
  }

  search(
    prefix?: string,
    limit = DEFAULT_SEARCH_LIMIT,
  ): MyanmarWordSearchResult {
    if (prefix !== undefined && typeof prefix !== 'string') {
      throw new BadRequestException('prefix must be a string');
    }

    const cleanPrefix = this.cleanWord(prefix ?? '');
    this.validateSearchLimit(limit);

    if (!cleanPrefix) {
      return {
        prefix: '',
        limit,
        count: 0,
        words: [],
      };
    }

    const words = this.orderedWords
      .filter((word) => word.startsWith(cleanPrefix))
      .sort((left, right) =>
        left.length === right.length
          ? this.compareOrdinal(left, right)
          : left.length - right.length,
      )
      .slice(0, limit);

    return {
      prefix: cleanPrefix,
      limit,
      count: words.length,
      words,
    };
  }

  check(request: MyanmarWordCheckRequest): MyanmarWordCheckResponse {
    this.validateCheckRequest(request);

    const includeSuggestions = request.includeSuggestions ?? true;
    const results = request.words.map((word) =>
      this.checkWord(this.cleanWord(word), includeSuggestions),
    );
    const ignoredCount = results.filter(
      (result) => result.status === MyanmarWordCheckStatus.Ignored,
    ).length;

    return {
      wordCount: results.length,
      checkedCount: results.length - ignoredCount,
      ignoredCount,
      results,
    };
  }

  getRawWordList(): string {
    return this.rawWordList;
  }

  private checkWord(
    word: string,
    includeSuggestions: boolean,
  ): MyanmarWordCheckResult {
    if (this.isAsciiOnly(word)) {
      return {
        word,
        status: MyanmarWordCheckStatus.Ignored,
        isCorrect: true,
        suggestions: [],
      };
    }

    if (this.words.has(word)) {
      return {
        word,
        status: MyanmarWordCheckStatus.Correct,
        isCorrect: true,
        suggestions: [],
      };
    }

    return {
      word,
      status: MyanmarWordCheckStatus.Misspelled,
      isCorrect: false,
      suggestions: includeSuggestions ? this.getSuggestions(word) : [],
    };
  }

  private getSuggestions(word: string): string[] {
    const cachedSuggestions = this.suggestionCache.get(word);

    if (cachedSuggestions) {
      return [...cachedSuggestions];
    }

    const candidates: SuggestionCandidate[] = [];
    const shortestLength = Math.max(1, word.length - MAX_SUGGESTION_DISTANCE);
    const longestLength = word.length + MAX_SUGGESTION_DISTANCE;

    for (let length = shortestLength; length <= longestLength; length += 1) {
      for (const candidate of this.wordsByLength.get(length) ?? []) {
        const distance = this.calculateLevenshteinDistance(word, candidate);

        if (distance <= MAX_SUGGESTION_DISTANCE) {
          candidates.push({ word: candidate, distance });
        }
      }
    }

    const suggestions = candidates
      .sort(
        (left, right) =>
          left.distance - right.distance ||
          left.word.length - right.word.length ||
          this.compareOrdinal(left.word, right.word),
      )
      .slice(0, MAX_SUGGESTIONS_PER_WORD)
      .map((candidate) => candidate.word);

    this.suggestionCache.set(word, suggestions);
    return [...suggestions];
  }

  private calculateLevenshteinDistance(source: string, target: string): number {
    let previousRow = Array.from(
      { length: target.length + 1 },
      (_, index) => index,
    );

    for (let sourceIndex = 1; sourceIndex <= source.length; sourceIndex += 1) {
      const currentRow = [sourceIndex];

      for (
        let targetIndex = 1;
        targetIndex <= target.length;
        targetIndex += 1
      ) {
        const substitutionCost =
          source[sourceIndex - 1] === target[targetIndex - 1] ? 0 : 1;
        currentRow[targetIndex] = Math.min(
          previousRow[targetIndex] + 1,
          currentRow[targetIndex - 1] + 1,
          previousRow[targetIndex - 1] + substitutionCost,
        );
      }

      previousRow = currentRow;
    }

    return previousRow[target.length];
  }

  private validateSearchLimit(limit: number): void {
    if (!Number.isInteger(limit) || limit < 1 || limit > MAX_SEARCH_RESULTS) {
      throw new BadRequestException(
        `limit must be an integer from 1 through ${MAX_SEARCH_RESULTS}`,
      );
    }
  }

  private validateCheckRequest(request: MyanmarWordCheckRequest): void {
    if (!request || !Array.isArray(request.words)) {
      throw new BadRequestException('words must be an array of strings');
    }

    if (request.words.length < 1 || request.words.length > MAX_BATCH_SIZE) {
      throw new BadRequestException(
        `words must contain from 1 through ${MAX_BATCH_SIZE} items`,
      );
    }

    if (
      request.includeSuggestions !== undefined &&
      typeof request.includeSuggestions !== 'boolean'
    ) {
      throw new BadRequestException('includeSuggestions must be a boolean');
    }

    for (const word of request.words) {
      if (typeof word !== 'string' || !this.cleanWord(word)) {
        throw new BadRequestException('each word must be a non-empty string');
      }

      if (this.cleanWord(word).length > MAX_WORD_LENGTH) {
        throw new BadRequestException(
          `each word must contain at most ${MAX_WORD_LENGTH} characters`,
        );
      }
    }
  }

  private cleanWord(word: string): string {
    return word.replace(/^\uFEFF+/, '').trim();
  }

  private isAsciiOnly(word: string): boolean {
    return /^[\x00-\x7F]+$/.test(word);
  }

  private compareOrdinal(left: string, right: string): number {
    if (left === right) {
      return 0;
    }

    return left < right ? -1 : 1;
  }
}
