import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { GroupHeaderDto } from "./group_header_dto";
import { GroupDetailDto } from "./group_detail_dto";

@Injectable()
export class DreamDictionaryService {
  private dreamDataGroup: any;
  private dreamDataDetail: any;

  constructor() {
    this.loadDreamData();
  }

  private loadDreamData() {
    const dataRoot = path.resolve(__dirname, '..', '..', '..', 'public', 'dream-dictionary');

    const filePathGroup = path.join(dataRoot, 'group.json');
    const jsonDataGroup = fs.readFileSync(filePathGroup, 'utf8');
    this.dreamDataGroup = JSON.parse(jsonDataGroup);

    const filePathDetail = path.join(dataRoot, 'detail.json');
    const jsonDataDetail = fs.readFileSync(filePathDetail, 'utf8');
    this.dreamDataDetail = JSON.parse(jsonDataDetail);
  }

  getGroupHeaders(): GroupHeaderDto[] {
    return this.dreamDataGroup.map((group: any) => ({
      groupId: group.groupId,
      title: group.title,
    }));
  }

  getGroupDetails(groupId: number): GroupDetailDto[] {
    const group = this.dreamDataGroup.find((group: any) => group.groupId === groupId);

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const groupDetails = this.dreamDataDetail.filter((group: any) => group.groupId === groupId);

    if (!groupDetails) {
      throw new NotFoundException(`Details for Group with ID ${groupId} not found`);
    }

    console.log(groupDetails);

    return groupDetails.map((detail: any) => ({
      id: detail.id,
      groupId: detail.groupId,
      title: detail.title,
    }));
  }
}
