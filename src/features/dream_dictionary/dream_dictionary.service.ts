import {Injectable, NotFoundException} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {GroupHeaderDto} from "./group_header_dto";
import {GroupDetailDto} from "./group_detail_dto";

@Injectable()
export class DreamDictionaryService {
  private dreamData: any;

  constructor() {
    this.loadDreamData();
  }

  private loadDreamData() {
    const projectRoot = path.join(__dirname, '..', '..');
    const filePath = path.join(projectRoot.replace("\dist", ''), 'public', 'dream-dictionary', 'data.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    this.dreamData = JSON.parse(jsonData);
  }

   getGroupHeaders(): GroupHeaderDto[] {
    return this.dreamData.map((group: any) => ({
      groupId: group.groupId,
      title: group.title,
    }));
  }

   getGroupDetails(groupId: number): GroupDetailDto[] {
    const group = this.dreamData.find((group: any) => group.groupId === groupId);

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    return group.data.map((detail: any) => ({
      id: detail.id,
      groupId: detail.groupId,
      title: detail.title,
    }));
  }
}