import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {
  MissingHistoricalRecordBook,
  MissingHistoricalRecordPage,
} from './missing-historical-records';

@Injectable()
export class MissingHistoricalRecordsService {
  private readonly dataRoot = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'public',
    'missing-historical-records',
  );

  private readonly books: MissingHistoricalRecordBook[];

  constructor() {
    this.books = this.readJson<MissingHistoricalRecordBook[]>('books.json');
  }

  getAll(): MissingHistoricalRecordBook[] {
    return this.books;
  }

  getById(bookId: number): MissingHistoricalRecordBook {
    const book = this.books.find((item) => item.BookId === bookId);

    if (!book) {
      throw new NotFoundException(`Missing historical record with ID ${bookId} not found`);
    }

    return book;
  }

  getPages(bookId: number): MissingHistoricalRecordPage[] {
    this.getById(bookId);
    return this.readJson<MissingHistoricalRecordPage[]>(`${bookId}.json`);
  }

  private readJson<T>(fileName: string): T {
    const filePath = path.join(this.dataRoot, fileName);
    const jsonData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData.trim()) as T;
  }
}
