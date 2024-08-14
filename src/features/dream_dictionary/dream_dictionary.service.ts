import { Injectable } from '@nestjs/common';
import { dir } from 'console';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DreamDictionaryService {
  private dreamData: any;

  constructor() {
    this.loadDreamData();
  }

  private loadDreamData() {
    const projectRoot = path.join(__dirname, '..', '..');
    const filePath = path.join(projectRoot.replace("\dist", ''), 'public', 'data', 'DreamDictionary.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    this.dreamData = JSON.parse(jsonData);
  }

  getBlogHeaders() {
    return this.dreamData.BlogHeader;
  }

  getBlogDetails(blogId: number) {
    return this.dreamData.BlogDetail.filter(detail => detail.BlogId === blogId);
  }
}
