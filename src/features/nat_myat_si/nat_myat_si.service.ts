import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { getPublicRoot } from '../../static-assets';
import {
  NatMyatSiData,
  NatMyatSiDataAnswer,
  NatMyatSiQuestion,
  NatMyatSiReading,
  NatMyatSiSymbol,
} from './nat_myat_si';

@Injectable()
export class NatMyatSiService {
  private readonly data: NatMyatSiData;
  private readonly questionsById: Map<number, NatMyatSiQuestion>;
  private readonly symbolsById: Map<string, NatMyatSiSymbol>;
  private readonly answersByKey: Map<string, NatMyatSiDataAnswer>;

  constructor() {
    const dataPath = path.join(getPublicRoot(), 'nat-myat-si', 'data.json');

    this.data = JSON.parse(fs.readFileSync(dataPath, 'utf8')) as NatMyatSiData;
    this.questionsById = new Map(
      this.data.questions.map((question) => [question.id, question]),
    );
    this.symbolsById = new Map(
      this.data.symbols.map((symbol) => [symbol.id, symbol]),
    );
    this.answersByKey = new Map(
      this.data.answers.map((answer) => [
        this.getAnswerKey(answer.question_id, answer.symbol_id),
        answer,
      ]),
    );
  }

  getQuestions(search?: string): NatMyatSiQuestion[] {
    const normalizedSearch = search?.trim().toLocaleLowerCase();

    if (!normalizedSearch) {
      return this.data.questions;
    }

    return this.data.questions.filter((question) =>
      question.text.toLocaleLowerCase().includes(normalizedSearch),
    );
  }

  getQuestion(questionId: number): NatMyatSiQuestion {
    const question = this.questionsById.get(questionId);

    if (!question) {
      throw new NotFoundException(
        `NatMyatSi question with ID ${questionId} not found`,
      );
    }

    return question;
  }

  getSymbols(): NatMyatSiSymbol[] {
    return this.data.symbols;
  }

  getReading(questionId: number, symbolId: string): NatMyatSiReading {
    const question = this.getQuestion(questionId);
    const normalizedSymbolId = symbolId.trim().toLocaleLowerCase();
    const symbol = this.symbolsById.get(normalizedSymbolId);

    if (!symbol) {
      throw new NotFoundException(
        `NatMyatSi symbol with ID ${symbolId} not found`,
      );
    }

    const answer = this.answersByKey.get(
      this.getAnswerKey(questionId, normalizedSymbolId),
    );

    if (!answer) {
      throw new NotFoundException(
        `NatMyatSi reading for question ${questionId} and symbol ${symbolId} not found`,
      );
    }

    return {
      question,
      symbol,
      answer: { text: answer.text },
    };
  }

  private getAnswerKey(questionId: number, symbolId: string): string {
    return `${questionId}:${symbolId}`;
  }
}
