import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PhayarSarTitle } from './phayar_sar_title';
import { PhayarSarDetail, PhayarSarParagraph } from './phayar_sar_detail';

interface PhayarSarDetailFile {
  id: number;
  groupId: number;
  title: string;
  content: string;
  sourceId?: string;
  about?: string;
  body?: PhayarSarParagraph[];
}

@Injectable()
export class PhayarSarService {
  private data: any[];
  private readonly dataRoot = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'public',
    'phayar-sar',
  );

  constructor() {
    this.loadData();
  }

  private loadData() {
    const filePath = path.join(this.dataRoot, 'data.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    this.data = JSON.parse(jsonData.trim());
  }

  getTitles(): PhayarSarTitle[] {
    return this.data.map(
      (group: any) =>
        new PhayarSarTitle(group.groupId, group.title, group.data),
    );
  }

  getDetails(groupId: number, detailId: number): PhayarSarDetail {
    const group = this.data.find((group: any) => group.groupId === groupId);

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const detailSummary = group.data.find(
      (detail: PhayarSarDetail) => detail.id === detailId,
    );

    if (!detailSummary) {
      throw new NotFoundException(
        `Prayer with ID ${detailId} not found in group ${groupId}`,
      );
    }

    const filePath = path.join(
      this.dataRoot,
      groupId.toString(),
      `${detailId}.json`,
    );

    let detail: PhayarSarDetailFile;
    try {
      const jsonData = fs.readFileSync(filePath, 'utf8');
      detail = JSON.parse(jsonData.trim()) as PhayarSarDetailFile;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new NotFoundException(
          `Prayer with ID ${detailId} not found in group ${groupId}`,
        );
      }
      throw error;
    }

    return new PhayarSarDetail(
      detail.id,
      detail.groupId,
      detail.title,
      detail.content,
      detail.sourceId,
      detail.about,
      detail.body,
    );
  }
}
