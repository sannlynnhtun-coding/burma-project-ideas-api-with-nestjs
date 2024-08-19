export class PhayarSarDetail {
    id: number;
    groupId: number;
    title: string;
    content: string;

    constructor(id: number, groupId: number, title: string, content: string) {
        this.id = id;
        this.groupId = groupId;
        this.title = title;
        this.content = content;
    }
}