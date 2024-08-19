// group-detail.ts
export class PhayarSarDetail {
    id: number;
    groupId: number;
    title: string;

    constructor(id: number, groupId: number, title: string) {
        this.id = id;
        this.groupId = groupId;
        this.title = title;
    }
}