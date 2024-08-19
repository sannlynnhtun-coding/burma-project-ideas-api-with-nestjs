import { PhayarSarDetail } from "./phayar_sar_detail";

export class PhayarSarTitle {
    groupId: number;
    title: string;
    data: PhayarSarDetail[];

    constructor(groupId: number, title: string, data: PhayarSarDetail[]) {
        this.groupId = groupId;
        this.title = title;
        this.data = data;
    }
}