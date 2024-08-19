import { Controller } from '@nestjs/common';

@Controller('phayar-sar')
export class PhayarSarController {}

// group-detail.ts
export class GroupDetail {
    id: number;
    groupId: number;
    title: string;

    constructor(id: number, groupId: number, title: string) {
        this.id = id;
        this.groupId = groupId;
        this.title = title;
    }
}

// group.ts
export class Group {
    groupId: number;
    title: string;
    data: GroupDetail[];

    constructor(groupId: number, title: string, data: GroupDetail[]) {
        this.groupId = groupId;
        this.title = title;
        this.data = data;
    }
}